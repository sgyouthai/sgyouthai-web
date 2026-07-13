# Singapore Youth AI Website

The official website for [Singapore Youth AI (SYAI)](https://sgyouthai.org), Singapore's largest youth AI community.

Founded in 2023 by students from polytechnics and junior colleges, SYAI brings young people together to learn, build, and create opportunities in artificial intelligence. This website introduces the community, showcases its programmes and partners, and shares event highlights.

## What is included

- Community overview, team, partners, and event gallery
- Programme pages for AI Monthly Meetups, SYAI Inspire, and SYAI Labs
- Membership and programme sign-up pages
- Community posts and updates

## Tech stack

- [Next.js 15](https://nextjs.org/) with the App Router and Turbopack
- [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) and Radix UI
- [Supabase](https://supabase.com/) for managed backend services
- [tRPC](https://trpc.io/) and TanStack Query for type-safe data access
- Framer Motion and GSAP for animation
- PostHog, Google Analytics, Vercel Analytics, and Speed Insights
- Vercel for hosting

## Getting started

### Prerequisites

- Node.js 20 or later
- npm
- Access to the required SYAI development services

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sgyouthai/sgyouthai-web.git
   cd sgyouthai-web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ask a project maintainer for the development environment configuration and save it as `.env.local` in the project root.

   Never commit `.env.local`, credentials, service-role keys, or other secrets. Variables prefixed with `NEXT_PUBLIC_` are included in the browser bundle and must never contain privileged credentials.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server with Turbopack |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run the configured Next.js lint command |

## Project structure

```text
src/
├── app/          # Application routes and layouts
├── components/   # Page sections and shared UI components
├── hooks/        # Reusable React hooks
├── lib/          # Shared application utilities
├── server/       # Server-side application logic
├── styles/       # Global styles
└── types/        # Shared TypeScript types
public/           # Public website assets
```

## Security

Internal API procedures, protected routes, data models, and operational instructions are intentionally not documented in this public README. Maintainers should keep detailed operational documentation in the team's private documentation.

Endpoint obscurity is not a security boundary. All protected operations must enforce server-side authentication and authorization, validate inputs, apply appropriate rate limits, and use least-privilege database grants and Row Level Security policies. Secrets must remain in approved environment-variable stores and must never be committed to the repository.

If you discover a security issue, report it privately to the project maintainers instead of opening a public issue.

## Deployment

The production site is deployed on Vercel. Deployment access and production environment configuration are restricted to project maintainers.

## Contributing

Create a branch for your change, test it locally, and open a pull request with a clear description and screenshots for visual updates. Do not commit credentials, personal data, local environment files, or private operational details.

For community enquiries, visit [sgyouthai.org](https://sgyouthai.org) or email [hello@sgyouthai.org](mailto:hello@sgyouthai.org).
