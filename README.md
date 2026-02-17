# Ecom

Next.js 15 e-commerce app (storefront + admin dashboard) built with TypeScript, Prisma, and PostgreSQL.

## Features

- Storefront: product listing, product detail, cart, checkout (Xendit Payment Request)
- Admin: products, categories, brands, locations, orders, customers
- Auth: Lucia sessions (superadmin + customer)
- Image uploads: local storage under `public/uploads/*` (gitignored)

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Prisma + PostgreSQL
- Lucia Auth
- Tailwind CSS + Radix UI (shadcn/ui)
- Zod validation
- Xendit (`xendit-node`)
- oxlint / oxfmt (lint/format)

## Setup

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment variables

Create `.env` from `.env.example`.

Required:
- `DATABASE_URL`
- `XENDIT_SECRET_KEY`
- `NEXT_PUBLIC_REDIRECT_URL`

Recommended:
- `XENDIT_WEBHOOK_CALLBACK_TOKEN` (validate webhook requests)

Optional:
- `NEXT_PUBLIC_FAILURE_RETURN_URL`

### 3) Prepare database

```bash
pnpm prisma migrate dev
```

Optional seed:

```bash
pnpm prisma:seed
```

### 4) Run the app

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Xendit Webhook

The app exposes:
- `POST /api/order/status`

This endpoint:
- Accepts `reference_id` / `referenceId` (also supports nested `data.reference_id` / `data.referenceId`)
- Updates the `order.status` by matching `order.code`
- If `XENDIT_WEBHOOK_CALLBACK_TOKEN` is set, it requires header `x-callback-token` to match
- Ignores unsupported events (expects `payment.succeeded`)

Configure your Xendit dashboard webhook URL to:
- `https://<your-domain>/api/order/status`

## Scripts

- `pnpm dev`: start dev server
- `pnpm build`: build for production
- `pnpm start`: run production server
- `pnpm lint`: oxlint
- `pnpm lint:fix`: oxlint autofix
- `pnpm format`: oxfmt write
- `pnpm type-check`: `tsc --noEmit`

## Project Structure

```
src/
  app/                 Next.js routes (App Router)
    (admin)/           Admin dashboard
    (customer)/        Storefront
    api/               Route handlers
  components/           Shared UI
  lib/                  Utilities (auth, prisma, uploads, xendit)
  type/                 Shared TS types
```
