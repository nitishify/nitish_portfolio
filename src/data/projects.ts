export type ProjectTag = 'fintech' | 'platform' | 'aws';

export interface Project {
  id: string;
  icon: 'chart' | 'bot' | 'plane' | 'grad';
  accent: string;
  client: string;
  domain: string;
  year: string;
  tags: ProjectTag[];
  title: string;
  short: string;
  impact: string[];
  stack: string[];
  flow: { label: string; key?: boolean }[];
  points: string[];
}

export const projectFilters: { id: 'all' | ProjectTag; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'platform', label: 'Web Platforms' },
  { id: 'aws', label: 'AWS / Serverless' },
];

export const projects: Project[] = [
  {
    id: 'iyurek',
    icon: 'chart',
    accent: '#22d3ee',
    client: 'IOanyT Innovations',
    domain: 'Fintech · AI',
    year: '2025 – 2026',
    tags: ['fintech', 'aws'],
    title: 'iYUREK — Real-time Market Intelligence',
    short: 'AI-powered platform that collects, analyzes and simplifies real-time cross-asset market data into fast, visual insights.',
    impact: ['Redis cache-first responses', '5 market regions', 'Price-alert emails'],
    stack: ['Python', 'AWS Lambda', 'API Gateway', 'Redis', 'MongoDB', 'CloudWatch'],
    flow: [
      { label: 'Client' },
      { label: 'API Gateway' },
      { label: 'AWS Lambda', key: true },
      { label: 'Redis Cache', key: true },
      { label: 'Twelve Data / FMP' },
      { label: 'MongoDB' },
    ],
    points: [
      'Developed AWS Lambda APIs in Python serving real-time index ribbons — current price, change and % change.',
      'Implemented a Redis cache-first strategy with fallback to Twelve Data and FMP APIs for fast, reliable data.',
      'Organised indices by region — US, Asia, Europe, Cryptocurrency and Commodities.',
      'Built a watchlist feature so users can track their preferred stocks and indices.',
      'Created price-alert APIs that email users when their stock thresholds are met.',
      'Refactored the codebase for performance, replacing print statements with structured CloudWatch logging.',
    ],
  },
  {
    id: 'ftmo',
    icon: 'bot',
    accent: '#a78bfa',
    client: 'Trading Automation',
    domain: 'Fintech',
    year: 'Backend',
    tags: ['fintech'],
    title: 'FTMO Trading Bot',
    short: 'Backend that executes trades across multiple brokers in real time from external strategy signals via webhooks.',
    impact: ['Low-latency execution', 'Multi-broker: MT5 + OANDA', 'Status notifications'],
    stack: ['Python', 'FastAPI', 'MT5 SDK', 'OANDA SDK', 'Pydantic', 'httpx'],
    flow: [
      { label: 'Strategy Platform' },
      { label: 'Webhook · FastAPI', key: true },
      { label: 'Pydantic Validation' },
      { label: 'MT5 / OANDA', key: true },
      { label: 'Email Alert' },
    ],
    points: [
      'Built RESTful APIs with FastAPI to process trading signals and execute the corresponding actions.',
      'Created webhook endpoints that receive buy/sell triggers from external strategy platforms.',
      'Integrated MetaTrader 5 and OANDA SDKs to automate execution across broker accounts.',
      'Implemented email notifications with execution status, including failure details.',
      'Ensured secure, validated payload handling with detailed logging and error management.',
      'Optimised for low-latency execution and reliability in both demo and live environments.',
    ],
  },
  {
    id: 'anrari',
    icon: 'plane',
    accent: '#60a5fa',
    client: 'Rirabh Consulting',
    domain: 'Travel',
    year: 'Booking Platform',
    tags: ['platform'],
    title: 'Anrari — Flight & Hotel Booking',
    short: 'Online platform for seamless flight and hotel booking with real-time availability, pricing and booking history.',
    impact: ['Live supplier integration', 'JWT-secured APIs', 'API fallback strategy'],
    stack: ['Python', 'Flask', 'SQLAlchemy', 'Marshmallow', 'PostgreSQL', 'JWT'],
    flow: [
      { label: 'Client' },
      { label: 'Flask REST API', key: true },
      { label: 'SQLAlchemy + Marshmallow' },
      { label: 'PostgreSQL' },
      { label: 'Travel Boutique API', key: true },
    ],
    points: [
      'Developed RESTful APIs with Flask for user operations, bookings and availability.',
      'Designed the relational schema with SQLAlchemy for integrity and performance.',
      'Used Marshmallow for serialization and validation, producing clean, structured responses.',
      'Integrated the Travel Boutique API for real-time flight and hotel availability, pricing and booking.',
      'Implemented JWT authentication, booking history and profile management.',
      'Added robust error handling, input validation and third-party fallback strategies.',
    ],
  },
  {
    id: 'nayeedisha',
    icon: 'grad',
    accent: '#34d399',
    client: 'Rirabh Consulting',
    domain: 'Edtech',
    year: 'Counseling Platform',
    tags: ['platform'],
    title: 'Nayeedisha — Study Counseling',
    short: 'Counseling platform guiding students toward courses in India and abroad, connecting students, counselors and admins.',
    impact: ['3 user roles with RBAC', 'Search & filtering', 'Documented REST API'],
    stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'JWT'],
    flow: [
      { label: 'Students · Counselors · Admins' },
      { label: 'Django + DRF', key: true },
      { label: 'RBAC + JWT' },
      { label: 'PostgreSQL', key: true },
    ],
    points: [
      'Built the backend with Django and Django REST Framework, exposing secure and scalable REST APIs.',
      'Designed the schema with Django models for students, counselors and course data on PostgreSQL.',
      'Implemented authentication and role-based access control for three user roles.',
      'Developed endpoints for course search, filtering, inquiry submission and profile management.',
      'Optimised queries with indexing and added validation, error handling and API documentation.',
    ],
  },
];
