# Cassedani Corp Bookkeeping and Taxes

Next.js + React bookkeeping website and application for Cassedani Corp.

## Current build

- Public marketing site: Home, Services, About, Contact
- Private-dashboard UI prototype
- PostgreSQL/Prisma data model for clients, transactions, and invoices
- API routes for clients, transactions, and invoices
- Environment template for production database configuration

## Local setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` to a PostgreSQL connection string.
4. Generate Prisma Client: `npm run db:generate`
5. Apply the schema: `npm run db:push`
6. Start the app: `npm run dev`

## Important

The dashboard UI and API foundation are not yet a complete production accounting system. Before production use, add authentication/authorization, audit logging, validated accounting workflows, secure file storage, backups, and deployment secrets. Never commit `.env.local` or real credentials.
