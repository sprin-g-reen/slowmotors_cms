# Slow Motors Agent Guidelines

## Project Identity
Slow Motors is a high-end vehicle inventory system. Speed and SEO are paramount.

## Tech Stack
- Next.js 15 (App Router)
- Supabase (Postgres)
- Prisma (ORM)
- ShadCN UI (Components)

## Coding Standards

### Strict TypeScript
- No `any` types allowed.
- All database entities must have corresponding Zod schemas.

### Server Components
- Default to React Server Components (RSC).
- Use 'use client' only for interactive leaves (buttons, forms).

### Styling
- Use Tailwind CSS utility classes.
- Do not create separate CSS files.

### State
- Use URL Search Params for global state (pagination, filtering) to ensure shareability.

### Domain Terminology
- Use **Rides** for collection of tours.
- Use **Gallery** for the collection of images.
- Use **Blog** for collection of experience.
- Use **Dynamic enquiry forms**.
- Use **Email workflows**.

### Images
- Images are crucial; always implement alt text and use `next/image`.
