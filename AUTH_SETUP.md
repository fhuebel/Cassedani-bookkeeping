# Cassedani Corp authentication setup

Authentication uses Better Auth with PostgreSQL and Prisma. Better Auth stores users, sessions, accounts, and verification records in the database.

## Environment

Copy `.env.example` to `.env` locally and set:

- `DATABASE_URL` to your PostgreSQL connection string.
- `BETTER_AUTH_SECRET` to a long random secret.
- `BETTER_AUTH_URL` to the app URL (`http://localhost:3000` locally).
- `AUTH_DISABLE_SIGNUP=true` for normal production use.

## Database

After `DATABASE_URL` is configured:

```bash
npm install
npm run db:generate
npx prisma migrate dev --name add-better-auth
```

Do not run a destructive database reset against a database containing real bookkeeping data.

## Create the first owner

1. Temporarily set `AUTH_DISABLE_SIGNUP=false` in the local/deployment environment.
2. Open `/setup` and create the owner account.
3. Sign in at `/sign-in` and confirm `/dashboard` works.
4. Set `AUTH_DISABLE_SIGNUP=true` again and redeploy.

The setup page is not linked from the public website. Keeping signup disabled after the owner account exists prevents public visitors from creating accounts.

## Security

The dashboard checks the authenticated session on the server before querying bookkeeping data. The `proxy.ts` file also redirects requests without a session cookie to `/sign-in`; the server-side check remains the authoritative security boundary.
