# BuildFlow — AI-Powered Construction Platform

Full-stack construction planning platform with AI-powered home design, project management, and payments.

## Live Site

**https://akashsrivastava626262-wq.github.io/BuildAI/**

## Project Structure

```
├── src/                  # Frontend (React + Vite + Tailwind)
├── backend/              # Backend API (Express + Prisma + PostgreSQL)
├── docker-compose.yml    # PostgreSQL for local development
└── README.md
```

## Frontend

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build
```

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4

## Backend

```bash
docker compose up -d          # Start PostgreSQL
cd backend
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev                   # http://localhost:4000
```

**Stack:** Node.js, Express, TypeScript, Prisma, PostgreSQL, Stripe, JWT

See **[backend/README.md](backend/README.md)** for full API documentation.

### API Health Check

```
GET http://localhost:4000/health
```

### Seed Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@buildflow.ai | Admin@123456 |
| Homeowner | homeowner@example.com | Homeowner@123 |
| Contractor | contractor@example.com | Contractor@123 |

## Contact

- Email: akashsrivastava626262@gmail.com
- Phone: +91 84168 35773
