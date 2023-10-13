# Slang

This is an open source slang dictionary.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)

## Features to be implemented

- [x] ORM using **Drizzle ORM**
- [x] Database on **PlanetScale**
- [x] Validation with **Zod**

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/ramozdev/slang.git
```

2. Install dependencies using pnpm

```bash
pnpm install
```

3. Copy the `.env.example` to `.env` and update the variables.

```bash
cp .env.example .env
```

4. Start the development server

```bash
pnpm run dev
```

5. Push the database schema

```bash
pnpm run db:push
```
