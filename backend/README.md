# BuildFlow API — Backend

Production-ready REST API for the BuildFlow construction planning platform.

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Runtime | **Node.js + Express + TypeScript** | Same language as React frontend; mature Stripe/email ecosystem |
| Database | **PostgreSQL + Prisma** | Relational integrity for users/projects/payments; ACID transactions |
| Auth | **JWT + bcrypt** | Stateless tokens with role-based access control |
| Payments | **Stripe** | Industry-standard payment processing with webhooks |
| Email | **Nodemailer (SMTP)** | Works with SendGrid, Mailgun, Gmail, Mailtrap |
| AI | **Placeholder integration** | Ready for OpenAI/Claude/construction APIs |

## Quick Start

### 1. Start PostgreSQL

```bash
# From repo root
docker compose up -d
```

### 2. Configure environment

```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

### 3. Install & setup database

```bash
npm install
npm run db:generate
npm run db:push      # or: npm run db:migrate
npm run db:seed
```

### 4. Run the server

```bash
npm run dev          # Development with hot reload
npm run build && npm start   # Production
```

Server runs at **http://localhost:4000**

Health check: `GET http://localhost:4000/health`

## Database Schema

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │──1:N──│   Project   │──1:N──│  Material   │
│             │       │             │       │             │
│ role        │       │ status      │       │ name        │
│ email       │       │ aiFloorPlan │       │ quantity    │
│ passwordHash│       │ aiBudget    │       │ unitPrice   │
└──────┬──────┘       └──────┬──────┘       └─────────────┘
       │                     │
       │1:N                  │1:N
       ▼                     ▼
┌─────────────┐       ┌─────────────┐
│   Payment   │       │   Enquiry   │
│             │       │  (public)   │
│ stripeId    │       │ status      │
│ amount      │       │ email       │
└─────────────┘       └─────────────┘

┌─────────────┐       ┌──────────────────┐
│  AdminLog   │       │ PasswordResetToken│
│  (audit)    │       │                   │
└─────────────┘       └──────────────────┘
```

### User Roles
- `HOMEOWNER` — Create projects, run AI, make payments
- `CONTRACTOR` — Same as homeowner (extensible for contractor-specific features)
- `ADMIN` — Full dashboard access, user management, enquiry oversight

## API Endpoints

### Auth `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | Public | Register (homeowner or contractor) |
| POST | `/login` | Public | Login, returns JWT |
| POST | `/logout` | Public | Logout (client-side token discard) |
| GET | `/me` | JWT | Get current user profile |
| PATCH | `/me` | JWT | Update profile |
| POST | `/forgot-password` | Public | Request password reset email |
| POST | `/reset-password` | Public | Reset password with token |

### Projects `/api/projects`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | JWT | List user's projects (admin: all) |
| POST | `/` | JWT | Create project |
| GET | `/:id` | JWT | Get project with materials |
| PATCH | `/:id` | JWT | Update project |
| DELETE | `/:id` | JWT | Delete project |
| POST | `/:id/generate-ai` | JWT | Run AI floor plan + budget + timeline |

### Materials `/api/projects/:projectId/materials`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | JWT | List materials |
| POST | `/` | JWT | Add material |
| PATCH | `/:id` | JWT | Update material |
| DELETE | `/:id` | JWT | Delete material |

### Enquiries `/api/enquiries`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Public | Submit demo/enquiry form |

### Payments `/api/payments`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/create-intent` | JWT | Create Stripe PaymentIntent |
| POST | `/create-checkout` | JWT | Create Stripe Checkout session |
| GET | `/history` | JWT | Payment history |
| POST | `/webhook` | Stripe | Stripe webhook handler |

### AI `/api/ai`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/floor-plan` | JWT | Generate floor plan |
| POST | `/budget` | JWT | Generate budget estimate |
| POST | `/timeline` | JWT | Generate timeline |
| POST | `/full-plan` | JWT | Generate complete plan package |

### Admin `/api/admin` (ADMIN role only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard` | Dashboard metrics |
| GET | `/users` | List all users (paginated) |
| PATCH | `/users/:id/role` | Update user role |
| GET | `/enquiries` | List all enquiries |
| PATCH | `/enquiries/:id/status` | Update enquiry status |
| GET | `/payments` | All payment records |
| GET | `/logs` | Admin audit logs |

## Seed Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@buildflow.ai | Admin@123456 |
| Homeowner | homeowner@example.com | Homeowner@123 |
| Contractor | contractor@example.com | Contractor@123 |

## Example Requests

### Register
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe","role":"HOMEOWNER"}'
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"homeowner@example.com","password":"Homeowner@123"}'
```

### Submit Enquiry (from landing page)
```bash
curl -X POST http://localhost:4000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Akash","email":"akashsrivastava626262@gmail.com","phone":"8416835773","message":"Interested in demo"}'
```

### Create Project + AI Generation
```bash
TOKEN="your-jwt-token"

curl -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Home","plotLength":12,"plotWidth":10,"projectType":"RESIDENTIAL","city":"Bangalore"}'

curl -X POST http://localhost:4000/api/projects/PROJECT_ID/generate-ai \
  -H "Authorization: Bearer $TOKEN"
```

## AI Integration

The AI service (`src/services/ai.service.ts`) currently returns realistic mock data. To connect a real AI API:

1. Set `AI_API_KEY` and `AI_API_URL` in `.env`
2. Uncomment the `fetch` block in `generateWithAI()`
3. Parse the JSON response into the typed result interfaces

Supported integration points:
- OpenAI GPT-4o (`AI_API_URL=https://api.openai.com/v1`)
- Anthropic Claude
- Specialized construction APIs

## Stripe Setup

1. Create account at https://stripe.com
2. Set `STRIPE_SECRET_KEY` in `.env`
3. For webhooks: `stripe listen --forward-to localhost:4000/api/payments/webhook`
4. Set `STRIPE_WEBHOOK_SECRET` from CLI output

## Email Setup

Configure SMTP in `.env`. Works with:
- **Mailtrap** (development)
- **SendGrid** (SMTP relay)
- **Gmail** (app password)

Without SMTP config, emails are logged to console in development.

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── config/            # Environment config
│   ├── lib/               # Prisma client
│   ├── middleware/         # Auth, validation, errors
│   ├── routes/            # Express route handlers
│   ├── services/          # Business logic
│   ├── utils/             # Error classes
│   ├── validators/        # Zod schemas
│   ├── app.ts             # Express app setup
│   └── index.ts           # Server entry point
├── .env.example
├── package.json
└── README.md
```
