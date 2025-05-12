import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongoose";
import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";


// User Model Definition
const User = mongoose.models?.User || 
  mongoose.model(
    "User",
    new mongoose.Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
      },
      { timestamps: true }
    )
  );

// Create Admin User (Async/Await version)
export async function createAdminUser(userData: { 
  name: string; 
  email: string; 
  password: string 
}): Promise<{ 
  id: string; 
  name: string; 
  email: string; 
  role: string 
}> {
  await connectToDatabase();
  
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const adminUser = new User({
    ...userData,
    password: hashedPassword,
    role: "admin"
  });

  const result = await adminUser.save();
  
  return {
    id: result._id.toString(),
    name: result.name,
    email: result.email,
    role: result.role
  };
}

// JWT Token Signing (Async/Await version)
export async function signJwtToken(
  payload: { id: string; [key: string]: any },
  expiresIn: string = '1d'
): Promise<string> {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn },
      (err, token) => {
        if (err || !token) {
          reject(err || new Error('Token generation failed'));
        } else {
          resolve(token);
        }
      }
    );
  });
}

// JWT Token Verification (Async/Await version)
export async function verifyAuth(token: string): Promise<{ 
  id: string; 
  [key: string]: any 
}> {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err, decoded) => {
        if (err || !decoded) {
          reject(err || new Error('Invalid token'));
        } else {
          resolve(decoded as { id: string; [key: string]: any });
        }
      }
    );
  });
}

// Usage example (matches your shown usage)
export async function exampleUsage(user: {
  _id: any;
  name: string;
  email: string;
  role: string;
}) {
  const token = await signJwtToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const session = await verifyAuth(token);
  
  return { token, session };
}


interface DecodedUser {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export async function verifyAuthFromRequest(
  request: NextRequest
): Promise<DecodedUser> {
  // 1. Get token from cookies
  const token = request.cookies.get("token")?.value;
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  // 2. Verify JWT_SECRET is available
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  // 3. Verify and decode the token
  try {
    const decoded = await new Promise<DecodedUser>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err || !decoded) {
          reject(err || new Error("Invalid token"));
          return;
        }
        resolve(decoded as DecodedUser);
      });
    });

    return decoded;
  } catch (error) {
    console.error("Authentication verification failed:", error);
    throw new Error("Invalid or expired authentication token");
  }
}