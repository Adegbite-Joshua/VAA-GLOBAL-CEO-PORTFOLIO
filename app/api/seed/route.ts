import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Blog from "@/lib/models/blog"
import Project from "@/lib/models/project"
import Service from "@/lib/models/service"
import Media from "@/lib/models/media"
import User from "@/lib/models/user"
import Settings from "@/lib/models/settings"
import bcrypt from "bcryptjs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get("adminKey")

    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    // Clear existing data
    await Blog.deleteMany({})
    await Project.deleteMany({})
    await Service.deleteMany({})
    await Media.deleteMany({})
    await Settings.deleteMany({})

    // Create default admin user if it doesn't exist
    const existingAdmin = await User.findOne({ role: "admin" })
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10)
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      })
    }

    // Create default settings
    await Settings.create({
      siteName: "CEO Portfolio",
      tagline: "Leadership & Strategy",
      description: "Executive leadership portfolio showcasing experience and expertise.",
      contactEmail: "contact@example.com",
      contactPhone: "+1 (555) 123-4567",
      address: "123 Business Ave, New York, NY 10001",
      socialLinks: {
        twitter: "https://twitter.com/ceoname",
        linkedin: "https://linkedin.com/in/ceoname",
        facebook: "https://facebook.com/ceoname",
        instagram: "https://instagram.com/ceoname",
      },
      updatedAt: new Date(),
    })

    // Seed blog posts
    const blogPosts = [
      {
        title: "The Future of Leadership in a Digital World",
        slug: "future-leadership-digital-world",
        content:
          "<p>Leadership in the digital age requires a new set of skills and mindsets. Today's leaders must navigate rapid technological change, distributed teams, and evolving business models.</p><p>In this post, I explore the key competencies that will define successful leadership in the coming decade, drawing on my experience leading digital transformation initiatives across multiple industries.</p><h2>Embracing Technological Fluency</h2><p>While leaders don't need to code, they must understand the strategic implications of technologies like AI, blockchain, and automation. This technological fluency enables better decision-making and resource allocation.</p><h2>Cultivating Adaptive Thinking</h2><p>The ability to pivot quickly and make decisions with incomplete information is crucial. Leaders must balance strategic vision with tactical flexibility.</p><h2>Building Inclusive, Distributed Teams</h2><p>Remote and hybrid work environments require intentional approaches to collaboration, communication, and culture-building. Leaders must create psychological safety across digital channels.</p><h2>Conclusion</h2><p>The future belongs to leaders who combine technological understanding with human-centered approaches. By developing these competencies, executives can navigate disruption and create sustainable value in an increasingly complex business landscape.</p>",
        excerpt:
          "Exploring the essential leadership competencies for navigating digital transformation and building resilient organizations in an era of technological disruption.",
        author: "Jane Smith",
        coverImage: "/images/blog/leadership-digital.jpg",
        date: new Date("2023-05-15"),
        readTime: "8 min read",
        category: "Leadership",
        tags: ["Digital Transformation", "Future of Work", "Executive Development"],
        featured: true,
        published: true,
      },
      {
        title: "Strategic Decision-Making Under Uncertainty",
        slug: "strategic-decision-making-uncertainty",
        content:
          "<p>Making high-stakes decisions with limited information is a defining challenge for executives. This article outlines a structured approach to decision-making that I've refined throughout my career leading organizations through market volatility and disruption.</p><h2>The Uncertainty Matrix</h2><p>I introduce a framework for categorizing decisions based on their reversibility and impact. This matrix helps determine the appropriate level of analysis and stakeholder involvement.</p><h2>Balancing Data and Intuition</h2><p>While data-driven approaches are valuable, experienced leaders know when to trust their intuition. I discuss how to calibrate this balance based on the decision context.</p><h2>Mitigating Cognitive Biases</h2><p>Our minds are susceptible to numerous biases that can derail decision quality. I share practical techniques for recognizing and counteracting these tendencies.</p><h2>Creating a Decision Journal</h2><p>Systematic reflection on past decisions accelerates learning. I outline a simple journaling practice that has dramatically improved my decision-making over time.</p><h2>Conclusion</h2><p>By applying these principles, leaders can make more effective decisions even in highly uncertain environments, creating competitive advantage through superior judgment.</p>",
        excerpt:
          "A practical framework for making high-quality decisions in complex business environments with incomplete information and competing priorities.",
        author: "Jane Smith",
        coverImage: "/images/blog/decision-making.jpg",
        date: new Date("2023-04-10"),
        readTime: "10 min read",
        category: "Strategy",
        tags: ["Decision Making", "Risk Management", "Executive Leadership"],
        featured: true,
        published: true,
      },
      {
        title: "Building a Culture of Innovation",
        slug: "building-culture-innovation",
        content:
          "<p>Organizational culture can either accelerate or stifle innovation. Based on my experience leading innovation initiatives at multiple companies, this article explores how executives can intentionally shape culture to drive creative problem-solving and experimentation.</p><h2>Beyond the Innovation Lab</h2><p>While dedicated innovation teams have their place, truly innovative companies embed creative thinking throughout the organization. I discuss approaches for democratizing innovation.</p><h2>Psychological Safety and Productive Failure</h2><p>Teams must feel safe to take risks and learn from failures. I share specific leadership behaviors that foster this environment and examples of how I've implemented them.</p><h2>Balancing Exploration and Execution</h2><p>Organizations need both creative exploration and disciplined execution. I outline governance structures that allow these seemingly contradictory activities to coexist and reinforce each other.</p><h2>Measuring Innovation Culture</h2><p>What gets measured gets managed. I propose metrics beyond traditional R&D spending that better capture an organization's innovation capacity.</p><h2>Conclusion</h2><p>Building an innovative culture requires sustained leadership attention and consistent reinforcement. The companies that master this capability gain significant competitive advantage in rapidly changing markets.</p>",
        excerpt:
          "Practical strategies for fostering organizational cultures where creative thinking thrives and innovation becomes part of the organizational DNA rather than a separate initiative.",
        author: "Jane Smith",
        coverImage: "/images/blog/innovation-culture.jpg",
        date: new Date("2023-03-05"),
        readTime: "7 min read",
        category: "Innovation",
        tags: ["Organizational Culture", "Innovation", "Leadership"],
        featured: false,
        published: true,
      },
      {
        title: "Navigating ESG Priorities for Modern Executives",
        slug: "navigating-esg-priorities",
        content:
          "<p>Environmental, Social, and Governance (ESG) considerations have moved from the periphery to the center of corporate strategy. This article examines how leaders can develop authentic ESG approaches that create value for all stakeholders.</p><h2>Beyond Compliance</h2><p>While regulatory requirements are expanding, leading companies view ESG as a strategic opportunity rather than a compliance burden. I discuss how to identify material ESG issues that align with your business model.</p><h2>Stakeholder Engagement</h2><p>Effective ESG strategy requires understanding diverse stakeholder perspectives. I outline structured approaches to mapping and engaging key stakeholders to inform priorities.</p><h2>Measurement and Transparency</h2><p>What gets measured gets managed. I review emerging standards for ESG reporting and how to build internal capabilities for tracking progress.</p><h2>Integration with Core Strategy</h2><p>Standalone sustainability initiatives often fail. I share examples of how companies have successfully integrated ESG considerations into their core business strategy and operations.</p><h2>Conclusion</h2><p>ESG leadership requires authenticity, strategic alignment, and consistent execution. When done well, it creates significant long-term value for shareholders and society.</p>",
        excerpt:
          "A strategic approach to environmental, social, and governance priorities that creates sustainable value and meets the expectations of increasingly conscious stakeholders.",
        author: "Jane Smith",
        coverImage: "/images/blog/esg-priorities.jpg",
        date: new Date("2023-02-20"),
        readTime: "9 min read",
        category: "Strategy",
        tags: ["ESG", "Sustainability", "Corporate Responsibility"],
        featured: false,
        published: true,
      },
      {
        title: "Leading Through Crisis: Lessons from the Pandemic",
        slug: "leading-through-crisis-pandemic-lessons",
        content:
          "<p>The COVID-19 pandemic tested leadership capabilities in unprecedented ways. In this reflective piece, I share key insights from leading organizations through this period of extreme uncertainty and disruption.</p><h2>Decisive Action with Incomplete Information</h2><p>Crisis demands decisions despite information gaps. I discuss how to balance speed and thoroughness when the stakes are highest.</p><h2>Transparent Communication</h2><p>During uncertainty, communication becomes even more critical. I outline principles for maintaining trust through honest, consistent messaging.</p><h2>Empathetic Leadership</h2><p>The pandemic affected people in profoundly different ways. I share approaches for leading with compassion while maintaining performance expectations.</p><h2>Organizational Resilience</h2><p>Some organizations adapted more effectively than others. I analyze the structural and cultural factors that enable resilience in crisis situations.</p><h2>Preparing for Future Disruptions</h2><p>While we can't predict specific crises, we can build capabilities that enable effective response. I propose a framework for developing organizational crisis readiness.</p><h2>Conclusion</h2><p>Crisis reveals leadership character and organizational culture. By internalizing these lessons, executives can build more adaptive, resilient organizations capable of thriving amid uncertainty.</p>",
        excerpt:
          "Critical leadership lessons from navigating the COVID-19 pandemic that can help executives prepare for and respond to future crises with resilience and clarity.",
        author: "Jane Smith",
        coverImage: "/images/blog/crisis-leadership.jpg",
        date: new Date("2023-01-15"),
        readTime: "11 min read",
        category: "Leadership",
        tags: ["Crisis Management", "Resilience", "Pandemic Response"],
        featured: false,
        published: true,
      },
    ]

    await Blog.insertMany(blogPosts)

    // Seed projects
    const projects = [
      {
        title: "Global Digital Transformation",
        slug: "global-digital-transformation",
        description:
          "Led a comprehensive digital transformation initiative for a Fortune 500 company, resulting in 30% cost reduction and 25% revenue growth within 18 months.",
        longDescription:
          "<p>As CEO, I spearheaded a comprehensive digital transformation initiative across all business units of this multinational corporation. The program encompassed:</p><ul><li>Modernizing legacy technology infrastructure</li><li>Implementing data-driven decision making processes</li><li>Developing new digital products and services</li><li>Restructuring teams around agile methodologies</li><li>Building digital capabilities through training and strategic hiring</li></ul><p>This transformation required significant change management across a workforce of over 50,000 employees in 30 countries. By establishing clear governance structures and maintaining consistent executive communication, we achieved high levels of organizational alignment and commitment.</p>",
        image: "/images/projects/digital-transformation.jpg",
        category: "current",
        year: "2022",
        tags: ["Digital Transformation", "Change Management", "Technology Strategy"],
        metrics: [
          "30% reduction in operational costs",
          "25% increase in digital revenue streams",
          "40% improvement in time-to-market",
          "Employee engagement increased by 22%",
        ],
        featured: true,
      },
      {
        title: "Sustainable Supply Chain Redesign",
        slug: "sustainable-supply-chain-redesign",
        description:
          "Transformed the company's global supply chain to reduce carbon footprint by 45% while improving resilience and reducing costs by 15%.",
        longDescription:
          "<p>This initiative represented a fundamental rethinking of our supply chain strategy to simultaneously address sustainability goals, resilience challenges highlighted by the pandemic, and ongoing cost pressures.</p><p>Key components included:</p><ul><li>Comprehensive carbon footprint analysis across all tiers of suppliers</li><li>Implementation of advanced analytics for inventory optimization</li><li>Strategic reshoring of critical components</li><li>Supplier development programs focused on environmental practices</li><li>Redesigned logistics networks to minimize emissions</li></ul><p>The project required close collaboration with hundreds of suppliers and significant internal change management. The resulting supply chain model has become an industry benchmark for balancing sustainability, resilience, and efficiency.</p>",
        image: "/images/projects/sustainable-supply-chain.jpg",
        category: "current",
        year: "2021",
        tags: ["Supply Chain", "Sustainability", "Operational Excellence"],
        metrics: [
          "45% reduction in supply chain carbon emissions",
          "15% reduction in total supply chain costs",
          "99.8% improvement in on-time delivery performance",
          "Supplier sustainability compliance increased to 94%",
        ],
        featured: true,
      },
      {
        title: "Market Expansion Strategy",
        slug: "market-expansion-strategy",
        description:
          "Developed and executed a market entry strategy for Asia-Pacific, growing regional revenue from $0 to $500M within 3 years.",
        longDescription:
          "<p>This strategic initiative involved establishing our company's presence in key Asian markets, with particular focus on China, Japan, Singapore, and Australia. The comprehensive approach included:</p><ul><li>Detailed market analysis and segmentation</li><li>Regulatory navigation strategy for each jurisdiction</li><li>Strategic partnerships with local companies</li><li>Tailored product adaptations for regional preferences</li><li>Building local leadership teams and organizational capabilities</li></ul><p>The expansion required careful balancing of global brand consistency with local market adaptation. By establishing strong governance mechanisms and clear decision rights between global and local teams, we achieved rapid scaling while maintaining quality and compliance standards.</p>",
        image: "/images/projects/market-expansion.jpg",
        category: "past",
        year: "2019",
        tags: ["Market Entry", "International Business", "Strategic Growth"],
        metrics: [
          "$500M in new revenue within 36 months",
          "Established operations in 7 countries",
          "Recruited and developed 5 regional leadership teams",
          "Achieved profitability in each market within 18 months of entry",
        ],
        featured: false,
      },
      {
        title: "Post-Merger Integration",
        slug: "post-merger-integration",
        description:
          "Led the successful integration of a $2B acquisition, achieving 120% of projected synergies while maintaining business continuity and key talent.",
        longDescription:
          "<p>Following the largest acquisition in the company's history, I led the integration effort to combine two organizations with different cultures, systems, and operating models. The integration strategy focused on:</p><ul><li>Accelerated synergy capture in overlapping functions</li><li>Careful cultural integration to preserve strengths of both organizations</li><li>Systems rationalization and technology platform consolidation</li><li>Unified go-to-market strategy while maintaining customer relationships</li><li>Comprehensive talent retention program for key personnel</li></ul><p>By establishing clear integration principles and governance structures, we maintained business momentum throughout the integration process while still achieving synergy targets ahead of schedule.</p>",
        image: "/images/projects/post-merger-integration.jpg",
        category: "past",
        year: "2018",
        tags: ["M&A", "Integration", "Change Management"],
        metrics: [
          "Achieved 120% of projected cost synergies",
          "Retained 95% of identified key talent",
          "Maintained 100% of top customer relationships",
          "Completed systems integration 3 months ahead of schedule",
        ],
        featured: false,
      },
      {
        title: "Corporate Innovation Program",
        slug: "corporate-innovation-program",
        description:
          "Established a corporate innovation program that launched 5 new business ventures, generating $150M in new revenue streams within 24 months.",
        longDescription:
          "<p>To address disruption in our core markets, I designed and implemented a comprehensive innovation program to develop new business models and revenue streams. The program included:</p><ul><li>Dedicated innovation fund with $50M annual budget</li><li>Internal incubator for employee-led ventures</li><li>External startup partnership program</li><li>Innovation governance board with clear investment criteria</li><li>Metrics and incentives aligned with long-term value creation</li></ul><p>The program required significant cultural change to embrace experimentation and risk-taking within a traditionally conservative organization. Through consistent executive sponsorship and early wins, we established innovation as a core capability across the enterprise.</p>",
        image: "/images/projects/corporate-innovation.jpg",
        category: "past",
        year: "2017",
        tags: ["Innovation", "Entrepreneurship", "New Business Development"],
        metrics: [
          "Launched 5 successful new ventures",
          "Generated $150M in new revenue",
          "Created portfolio of 30+ patents",
          "Established partnerships with 12 leading startups",
        ],
        featured: true,
      },
    ]

    await Project.insertMany(projects)

    // Seed services
    const services = [
      {
        title: "Executive Leadership Coaching",
        slug: "executive-leadership-coaching",
        description:
          "Personalized coaching for C-suite executives and senior leaders navigating complex challenges and transitions.",
        image: "/images/services/executive-coaching.jpg",
        features: [
          "One-on-one coaching sessions tailored to your specific leadership challenges",
          "360-degree feedback and leadership assessment",
          "Personalized development plan with concrete action steps",
          "Ongoing support and accountability",
          "Access to proprietary leadership frameworks and tools",
        ],
        options: [
          {
            title: "Executive Intensive",
            description:
              "6-month intensive coaching program with weekly sessions, comprehensive assessments, and unlimited email support.",
            price: "$25,000",
          },
          {
            title: "Leadership Accelerator",
            description:
              "3-month focused coaching program with bi-weekly sessions and targeted development in specific leadership areas.",
            price: "$12,000",
          },
          {
            title: "Transition Support",
            description:
              "Specialized coaching for executives in new roles or navigating significant organizational changes.",
            price: "$15,000",
          },
        ],
        featured: true,
      },
      {
        title: "Strategic Advisory Services",
        slug: "strategic-advisory-services",
        description:
          "Expert guidance on complex strategic challenges, from market expansion to digital transformation and organizational redesign.",
        image: "/images/services/strategic-advisory.jpg",
        features: [
          "Comprehensive situation analysis and strategic diagnosis",
          "Facilitated strategy development workshops with leadership teams",
          "Implementation roadmap with clear milestones and metrics",
          "Ongoing advisory support throughout execution",
          "Access to industry insights and best practices",
        ],
        options: [
          {
            title: "Comprehensive Strategy Review",
            description:
              "End-to-end assessment of current strategy, market position, and organizational capabilities with detailed recommendations.",
            price: "$75,000",
          },
          {
            title: "Strategy Sprint",
            description: "Focused 4-week engagement to address a specific strategic challenge or opportunity.",
            price: "$30,000",
          },
          {
            title: "Ongoing Strategic Advisory",
            description:
              "Regular advisory sessions with leadership team to provide external perspective on strategic decisions.",
            price: "$10,000/month",
          },
        ],
        featured: true,
      },
      {
        title: "Board Advisory Services",
        slug: "board-advisory-services",
        description:
          "Expert guidance for boards of directors on governance, strategy, risk management, and CEO succession planning.",
        image: "/images/services/board-advisory.jpg",
        features: [
          "Board effectiveness assessments and improvement plans",
          "Governance structure and process optimization",
          "Strategic oversight enhancement",
          "CEO performance evaluation and succession planning",
          "Crisis management preparedness",
        ],
        options: [
          {
            title: "Board Effectiveness Review",
            description:
              "Comprehensive assessment of board composition, structure, and processes with detailed recommendations for improvement.",
            price: "$50,000",
          },
          {
            title: "Governance Optimization",
            description: "Focused engagement to enhance specific aspects of board governance and strategic oversight.",
            price: "$25,000",
          },
          {
            title: "Ongoing Board Advisory",
            description:
              "Regular advisory sessions with board chair and committee leads to provide external perspective on governance matters.",
            price: "$8,000/month",
          },
        ],
        featured: false,
      },
      {
        title: "Executive Team Development",
        slug: "executive-team-development",
        description:
          "Transform high-potential executive groups into high-performing leadership teams aligned around common purpose and collective success.",
        image: "/images/services/team-development.jpg",
        features: [
          "Team effectiveness assessment and baseline",
          "Facilitated alignment on purpose, goals, and operating norms",
          "Conflict resolution and communication enhancement",
          "Decision-making process optimization",
          "Ongoing team coaching and development",
        ],
        options: [
          {
            title: "Team Transformation Program",
            description:
              "6-month comprehensive program including assessment, workshops, and ongoing coaching to fundamentally elevate team performance.",
            price: "$100,000",
          },
          {
            title: "Alignment Accelerator",
            description:
              "Intensive 2-day offsite followed by 90 days of implementation support to rapidly align the team around critical priorities.",
            price: "$45,000",
          },
          {
            title: "Team Coaching",
            description:
              "Ongoing coaching for the team as a unit, focusing on real-time challenges and continuous improvement.",
            price: "$15,000/month",
          },
        ],
        featured: false,
      },
      {
        title: "Digital Leadership Development",
        slug: "digital-leadership-development",
        description:
          "Equip executives and senior leaders with the mindset and capabilities needed to lead effectively in an increasingly digital business environment.",
        image: "/images/services/digital-leadership.jpg",
        features: [
          "Digital fluency assessment and personalized learning plan",
          "Understanding of key technologies and their business implications",
          "Data-driven decision making frameworks",
          "Digital transformation leadership principles",
          "Innovation and experimentation methodologies",
        ],
        options: [
          {
            title: "Digital Leadership Immersion",
            description:
              "Comprehensive program including assessment, workshops, technology demonstrations, and ongoing coaching.",
            price: "$60,000",
          },
          {
            title: "Digital Fundamentals",
            description:
              "Focused program covering essential digital concepts and leadership implications for traditional executives.",
            price: "$25,000",
          },
          {
            title: "Technology Deep Dives",
            description:
              "Specialized sessions on specific technologies (AI, blockchain, IoT, etc.) and their strategic business applications.",
            price: "$15,000 per topic",
          },
        ],
        featured: true,
      },
    ]

    await Service.insertMany(services)

    // Seed media items
    const mediaItems = [
      {
        title: "The Future of Work After COVID-19",
        slug: "future-work-after-covid",
        description:
          "A discussion on how the pandemic has permanently changed workplace dynamics and what leaders should be focusing on in the new normal.",
        image: "/images/media/future-work-video.jpg",
        type: "video",
        date: new Date("2023-04-15"),
        location: "Future of Business Summit, New York",
        link: "https://www.youtube.com/watch?v=example1",
        featured: true,
      },
      {
        title: "Leading Through Disruption",
        slug: "leading-through-disruption",
        description:
          "An in-depth conversation about navigating organizational change during periods of industry disruption and technological transformation.",
        image: "/images/media/leadership-podcast.jpg",
        type: "podcast",
        date: new Date("2023-03-10"),
        location: "The Leadership Edge Podcast",
        link: "https://www.leadershippodcast.com/example",
        featured: true,
      },
      {
        title: "Strategic Decision-Making in Uncertain Times",
        slug: "strategic-decision-making-uncertain-times",
        description:
          "A keynote address on frameworks for making high-quality decisions when facing unprecedented levels of volatility and ambiguity.",
        image: "/images/media/keynote-video.jpg",
        type: "video",
        date: new Date("2023-02-20"),
        location: "Global Leadership Forum, London",
        link: "https://www.youtube.com/watch?v=example2",
        featured: false,
      },
      {
        title: "The ESG Imperative for Modern Businesses",
        slug: "esg-imperative-modern-businesses",
        description:
          "An article exploring how environmental, social, and governance factors are reshaping corporate strategy and stakeholder expectations.",
        image: "/images/media/article-esg.jpg",
        type: "article",
        date: new Date("2023-01-15"),
        location: "Harvard Business Review",
        link: "https://hbr.org/example-article",
        featured: true,
      },
      {
        title: "Digital Transformation: Beyond the Technology",
        slug: "digital-transformation-beyond-technology",
        description:
          "A panel discussion on the human and organizational elements that determine success in digital transformation initiatives.",
        image: "/images/media/panel-video.jpg",
        type: "video",
        date: new Date("2022-12-05"),
        location: "Tech Leaders Summit, San Francisco",
        link: "https://www.youtube.com/watch?v=example3",
        featured: false,
      },
      {
        title: "Building Resilient Organizations",
        slug: "building-resilient-organizations",
        description:
          "A podcast interview discussing strategies for developing organizational capabilities that enable adaptation to unexpected challenges.",
        image: "/images/media/resilience-podcast.jpg",
        type: "podcast",
        date: new Date("2022-11-10"),
        location: "Business Resilience Today",
        link: "https://www.businessresilience.com/example",
        featured: false,
      },
      {
        title: "Innovation at Scale: Lessons from Global Leaders",
        slug: "innovation-at-scale",
        description:
          "An article examining how large organizations can maintain entrepreneurial capabilities while leveraging their scale advantages.",
        image: "/images/media/article-innovation.jpg",
        type: "article",
        date: new Date("2022-10-20"),
        location: "MIT Sloan Management Review",
        link: "https://sloanreview.mit.edu/example-article",
        featured: false,
      },
    ]

    await Media.insertMany(mediaItems)

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
