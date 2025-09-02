# E-Commerce Admin Dashboard

A modern e-commerce admin dashboard built with Next.js 15, TypeScript, and Prisma.

## Features

- **Product Management**: Create, read, update, and delete products with image upload
- **Category Management**: Organize products into categories
- **Brand Management**: Manage product brands
- **Location Management**: Track inventory across multiple locations
- **Order Management**: View and manage customer orders
- **Customer Management**: Manage customer information
- **Dashboard Analytics**: Overview of key metrics and statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Authentication**: Secure login and session management

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Prisma](https://www.prisma.io/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Reusable component library
- [Lucide React](https://lucide.dev/) - Icon library
- [Supabase](https://supabase.com/) - Image storage
- [Lucia Auth](https://lucia-auth.com/) - Authentication
- [Zod](https://zod.dev/) - Validation library
- [Biome](https://biomejs.dev/) - Linter and formatter

## Getting Started

First, install the dependencies:

```bash
bun install
```

Set up the database:

```bash
bunx prisma generate
bunx prisma migrate dev
```

Create a `.env` file based on `.env.example` and fill in your environment variables.

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `bun dev` - Runs the development server
- `bun build` - Builds the application for production
- `bun start` - Runs the built application
- `bun run lint` - Checks for linting errors
- `bun run lint:fix` - Fixes linting errors automatically
- `bun run format` - Formats code according to Biome configuration
- `bun run type-check` - Runs TypeScript type checking

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── (admin)/      # Admin dashboard pages
│   └── api/          # API routes
├── components/       # Shared React components
├── lib/              # Utility functions and libraries
└── type/             # TypeScript types
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Prisma Documentation](https://www.prisma.io/docs/) - Database toolkit documentation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework