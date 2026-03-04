# ProSe Ready 🏛️

**Simulador de Entrevistas de Asilo con IA**

ProSe Ready helps asylum seekers practice their interviews with AI technology, contradiction detection, and instant feedback.

## Stack

- **Next.js 14** — App Router + TypeScript
- **Tailwind CSS** — Liquid Glass design system
- **Prisma** — PostgreSQL ORM
- **n8n** — Chatbot automation (coming soon)
- **Retell AI** — Voice simulation (coming soon)

## Local Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Auth secret key |
| `NEXTAUTH_URL` | App URL |
| `N8N_WEBHOOK_URL` | n8n webhook for chatbot |
| `RETELL_API_KEY` | Retell AI for voice |

## Deploy to EasyPanel (Nixpacks)

1. Push this repo to GitHub
2. In EasyPanel → Create Service → App
3. Connect your GitHub repo (`magnetraffic01/prose-ready`)
4. Build method: **Nixpacks** (auto-detected)
5. Add environment variables from `.env.example`
6. Set `PORT=3000`
7. Deploy 🚀

EasyPanel will auto-detect Next.js and build with `npm run build`.
The `output: "standalone"` in `next.config.ts` ensures optimal Docker-compatible output.

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | Health check |

## Project Structure

```
prose-ready/
├── app/              # Next.js App Router
├── components/       # UI Components
├── lib/              # Utilities (Prisma client)
├── prisma/           # Database schema
└── public/           # Static assets
```
