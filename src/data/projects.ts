export type ProjectTag = 'fintech' | 'platform' | 'aws';

export interface Project {
  id: string;
  icon: 'chart' | 'bot' | 'plane' | 'grad' | 'phone' | 'briefcase';
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
  /** Screenshots in public/projects, shown on the project's own page. */
  gallery?: { src: string; caption: string }[];
  /** Public URL of the live product. */
  liveUrl?: string;
}

export const projectFilters: { id: 'all' | ProjectTag; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'platform', label: 'Web Platforms' },
  { id: 'aws', label: 'AWS / Serverless' },
];

export const projects: Project[] = [
  {
    id: 'ringopus',
    icon: 'phone',
    accent: '#f472b6',
    client: 'Rirabh Consulting',
    domain: 'Telecom · Cloud PBX',
    year: '2026 – Present',
    tags: ['platform'],
    title: 'Ringopus — Visual Call Flow Engine',
    gallery: [
      { src: '/projects/ringopus-flow-1.png', caption: 'A call flow in the visual builder: inbound call, caller profile check, ZIP code gather, router and dial, with hangup on failure.' },
      { src: '/projects/ringopus-flow-2.png', caption: "Routing by the caller's state: each branch dials a different team and falls back to voicemail. My engine executes flows like this on live calls." },
    ],
    short: 'Real-time engine that runs drag-and-drop call flows on live phone calls for a cloud PBX, built on Asterisk FastAGI.',
    impact: ['20+ call flow nodes', 'Runs on live calls', 'Per-call execution trace'],
    stack: ['Python', 'Asterisk', 'FastAGI', 'PostgreSQL', 'Django', 'SIP'],
    flow: [
      { label: 'Incoming call' },
      { label: 'Asterisk · PJSIP' },
      { label: 'FastAGI · Python', key: true },
      { label: 'Flow engine', key: true },
      { label: 'IVR · Routing · Transfer' },
      { label: 'Logs + CDR' },
    ],
    points: [
      'Designed and built the call flow execution engine from scratch: loads the published flow, runs nodes through a registry, follows each outcome to the next node, caps steps to stop infinite loops and handles hangups cleanly.',
      'Implemented 20+ nodes: IVR menus, digit input with validation and retries, play audio, music on hold, voicemail with auto-provisioned mailboxes, business hours, holiday calendar, condition router, weighted distributor, transfer, conference, fax, call forwarding and more.',
      'Built ring groups (ring all, sequential, random, skip busy members) as a reusable module that works both as a flow node and as a direct phone-number destination.',
      'Added per-call execution logging: every node step is recorded with its outcome, duration and a readable summary alongside CDR data, so support can trace exactly what happened on any call.',
      'Hardened live-call handling: reliable caller-hangup detection, answering before playback, failing fast on missing prompt audio, and call recording with MP3 conversion and recording URLs.',
      'Defined node config contracts and validation with the Django backend team and the frontend developer who built the drag-and-drop builder.',
    ],
  },
  {
    id: 'ca-crm',
    icon: 'briefcase',
    accent: '#fbbf24',
    client: 'Rirabh Consulting',
    domain: 'Accounting · SaaS',
    year: 'In production',
    tags: ['platform'],
    title: 'CA CRM — Practice Management for Accounting Firms',
    gallery: [
      { src: '/projects/ca-crm-dashboard.jpg', caption: 'CA dashboard: quick actions, filters, coverage and latest activity. Client details are blurred for privacy.' },
      { src: '/projects/ca-crm-documents.jpg', caption: 'Documents organised per company with folder and file counts. Company names are blurred.' },
      { src: '/projects/ca-crm-companies.jpg', caption: 'Company list with client and account-manager assignment and bulk actions. Client data is blurred.' },
    ],
    short: 'Full stack CRM that runs a CA firm day to day: clients, documents, tasks, fees and messaging. Live in India, with a UAE edition.',
    impact: ['Live in India + UAE', '3 roles with scoped access', 'Global Ctrl+K search'],
    stack: ['Python', 'Django', 'DRF', 'React', 'PostgreSQL', 'JWT', 'Nginx'],
    flow: [
      { label: 'CA · Manager · Client' },
      { label: 'React SPA' },
      { label: 'Django + DRF', key: true },
      { label: 'Role permissions', key: true },
      { label: 'PostgreSQL' },
    ],
    points: [
      'Work across the whole product (Django REST backend and React frontend), including deployment and production support for two client firms.',
      'Designed three roles (CA/admin, Account Manager, Client) with per-role permissions and scoped data access; JWT auth with token blacklisting and rate-limited login.',
      'Built document management with categories, financial years, bulk upload, in-app PDF preview and a safe category rename that relabels documents and manager assignments in one transaction.',
      'Built the task workflow: assignment, fee approval, transfers, recurring tasks and discussion threads, plus direct messaging with attachments and last-seen status.',
      'Added a dashboard with analytics charts and an exportable compliance report, global Ctrl+K search across tasks, companies, documents and users, and an audit log with a per-company timeline.',
      'Replaced per-category document-count requests with a single grouped query to lighten the dashboard; deployed on Debian with Nginx, Gunicorn, Let’s Encrypt SSL and automated Google Drive backups.',
    ],
  },
  {
    id: 'iyurek',
    icon: 'chart',
    accent: '#22d3ee',
    client: 'IOanyT Innovations',
    domain: 'Fintech · AI',
    year: '2025 – 2026',
    tags: ['fintech', 'aws'],
    title: 'iYUREK — Real-time Market Intelligence',
    gallery: [{ src: '/projects/iyurek.jpg', caption: 'iYUREK dashboard: major indices by region, market news and symbol analytics, fed by the market-data APIs.' }],
    liveUrl: 'https://app.iyurek.com',
    short: 'AI-powered platform that collects, analyzes and simplifies real-time cross-asset market data into fast, visual insights.',
    impact: ['WebSocket → Redis live prices', '5 market regions', 'Price-alert emails'],
    stack: ['Python', 'AWS Lambda', 'API Gateway', 'Redis', 'MongoDB', 'CloudWatch'],
    flow: [
      { label: 'WebSocket Feed' },
      { label: 'Redis Live Prices', key: true },
      { label: 'AWS Lambda', key: true },
      { label: 'API Gateway' },
      { label: 'Client' },
      { label: 'REST Failover' },
    ],
    points: [
      'Developed AWS Lambda APIs in Python serving real-time index ribbons — current price, change and % change.',
      'Streamed live prices over a WebSocket into Redis, so APIs read the latest price in milliseconds without calling the provider.',
      'Added automatic failover to the Twelve Data and FMP REST APIs when the WebSocket is down or data is stale.',
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
    gallery: [{ src: '/projects/ftmo.jpg', caption: 'Illustrative view of the webhook API: signal in, validated, order placed on the broker.' }],
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
    gallery: [{ src: '/projects/anrari.jpg', caption: 'Illustrative view of the booking API: search, availability and booking endpoints.' }],
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
    gallery: [{ src: '/projects/nayeedisha.jpg', caption: 'Live site: students search programs by country and budget, served by the Django REST backend.' }],
    liveUrl: 'https://nayeedisha.in',
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
