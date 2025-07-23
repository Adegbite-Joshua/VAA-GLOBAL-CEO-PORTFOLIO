// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

const allowedOrigins = [
  'https://www.tosinayodeji.xyz',
  'https://tosinayodeji.xyz',
  'www.tosinayodeji.xyz',
  'https://vaaglobalceoportfolio.vercel.app',
];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};