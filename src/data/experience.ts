export interface Job {
  role: string;
  company: string;
  short: string;
  location: string;
  period: string;
  current?: boolean;
  note?: string;
  points: string[];
  stack: string[];
  /** Shown in the timeline's opposite-side panel. */
  year: string;
  duration: string;
  focus: string;
  logos: string[];
}

export const experience: Job[] = [
  {
    role: 'Full Stack Developer',
    company: 'Rirabh Consulting Services LLP',
    short: 'R',
    location: 'Noida',
    period: 'Mar 2026 — Present',
    current: true,
    note: 'Rejoined in an expanded full stack role',
    points: [
      'Built Ringopus’ call flow engine: a Python FastAGI service that runs drag-and-drop call flows on live Asterisk calls, with 20+ nodes (IVR, routing, ring groups, voicemail, conference).',
      'Develop CA CRM, a practice-management platform live for accounting firms in India and the UAE, across the Django REST backend and React frontend.',
      'Designed role-based access for 3 user types, document and task workflows, global search and audit logging in CA CRM.',
      'Deploy and support production on Linux with Nginx, Gunicorn and SSL; review code and push for structured logging.',
    ],
    stack: ['Python', 'Django', 'React', 'PostgreSQL', 'Asterisk', 'FastAGI'],
    year: '2026',
    duration: 'Now',
    focus: 'Cloud PBX engine · CA CRM',
    logos: ['React', 'Django', 'FastAPI', 'AWS'],
  },
  {
    role: 'Software Engineer',
    company: 'IOanyT Innovations Pvt. Ltd.',
    short: 'IO',
    location: 'Noida',
    period: 'Feb 2025 — Mar 2026',
    points: [
      'Developed scalable Python APIs on AWS Lambda and API Gateway powering real-time trading platforms.',
      'Designed event-driven workflows with AWS SQS and EventBridge for reliable, decoupled processing.',
      'Delivered live market data via a WebSocket stream into Redis, with failover to Twelve Data and FMP REST APIs.',
      'Improved API performance and reliability; added structured CloudWatch logging and shipped with frontend and DevOps teams.',
    ],
    stack: ['AWS Lambda', 'API Gateway', 'SQS', 'EventBridge', 'Redis', 'MongoDB'],
    year: '2025',
    duration: '1 year',
    focus: 'Serverless · Real-time fintech',
    logos: ['AWS', 'Python', 'Redis', 'MongoDB'],
  },
  {
    role: 'Python Developer',
    company: 'Rirabh Consulting Services LLP',
    short: 'R',
    location: 'Noida',
    period: 'Jan 2023 — Feb 2025',
    points: [
      'Built RESTful APIs with Django REST Framework and Flask for multiple client web applications.',
      'Wrote complex, optimised queries with Django ORM and SQLAlchemy on PostgreSQL and MySQL.',
      'Implemented serialization and validation with DRF Serializers and Marshmallow; secured APIs with JWT.',
      'Owned API testing in Postman and automated workflows with Python scripting.',
    ],
    stack: ['Django', 'DRF', 'Flask', 'SQLAlchemy', 'MySQL', 'JWT'],
    year: '2023',
    duration: '2 yrs 2 mos',
    focus: 'Backend · REST APIs',
    logos: ['Django', 'Flask', 'PostgreSQL', 'MySQL'],
  },
  {
    role: 'Software Developer Intern',
    company: 'TwoWaits Technologies Pvt. Ltd.',
    short: 'TW',
    location: 'Noida',
    period: 'Oct 2022 — Dec 2022',
    points: [
      'Built RESTful APIs with Flask and Django on MySQL and PostgreSQL in a team environment.',
      'Applied OOP, DBMS and Git workflows on real-world projects.',
    ],
    stack: ['Flask', 'Django', 'MySQL', 'Git'],
    year: '2022',
    duration: '3 months',
    focus: 'Where it all started',
    logos: ['Python', 'Flask', 'Git'],
  },
];
