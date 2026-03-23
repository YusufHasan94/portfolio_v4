# Portfolio V4

A modern, full-stack developer portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Supabase**. Features a live-updating public portfolio and a password-protected admin dashboard to manage all content dynamically.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up Supabase](#3-set-up-supabase)
  - [4. Configure Environment Variables](#4-configure-environment-variables)
  - [5. Run the Development Server](#5-run-the-development-server)
- [Environment Variables](#environment-variables)
- [Admin Dashboard](#admin-dashboard)
  - [Accessing the Dashboard](#accessing-the-dashboard)
  - [Authentication](#authentication)
  - [Dashboard Sections](#dashboard-sections)
  - [Managing Content](#managing-content)
- [API Routes](#api-routes)
- [Deployment](#deployment)
  - [Docker](#docker)
  - [CI/CD with Jenkins](#cicd-with-jenkins)
- [Scripts](#scripts)

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Framework    | Next.js 15 (App Router)                 |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS v4                         |
| Database     | Supabase (PostgreSQL)                   |
| Storage      | Supabase Storage (S3-compatible)        |
| Animation    | Framer Motion, GSAP                     |
| Auth         | Cookie-based (httpOnly, custom)         |
| Deployment   | Docker + Jenkins CI/CD                  |

---

## Project Structure

```
portfolio_v4/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Public portfolio homepage
│   │   ├── about/              # About page
│   │   ├── admin/              # 🔒 Protected admin dashboard
│   │   │   ├── layout.tsx      # Auth-checking layout wrapper
│   │   │   ├── page.tsx        # Dashboard overview
│   │   │   ├── login/          # Admin login page
│   │   │   ├── hero/           # Hero section editor
│   │   │   ├── skills/         # Skills manager
│   │   │   ├── services/       # Services manager
│   │   │   ├── projects/       # Projects manager
│   │   │   └── career/         # Career timeline manager
│   │   └── api/                # API routes
│   │       ├── auth/           # Auth check & login/logout endpoints
│   │       ├── portfolio/      # Aggregate portfolio data fetch
│   │       └── upload/         # File/image upload to Supabase Storage
│   ├── sections/               # Public portfolio sections (Hero, Projects, etc.)
│   ├── components/             # Reusable UI components (AdminNav, etc.)
│   ├── lib/
│   │   ├── auth.ts             # Auth utilities (cookie set/clear/verify)
│   │   ├── dataManager.ts      # Supabase CRUD helpers
│   │   └── supabase/           # Supabase client & admin client
│   ├── types/                  # TypeScript interfaces (PortfolioData, etc.)
│   ├── data/                   # Static fallback data
│   └── middleware.ts           # Route protection for /admin/* paths
├── public/                     # Static assets
├── supabase/                   # Supabase schema/migrations
├── scripts/                    # Utility scripts
├── Dockerfile
├── Jenkinsfile
├── next.config.ts
└── .env.local                  # Local environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- **Node.js** v20 or later
- **npm** v9 or later
- A **Supabase** project ([supabase.com](https://supabase.com))

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio_v4
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

In your Supabase project, create the following tables:

#### `hero` table
| Column          | Type    |
|-----------------|---------|
| id              | int (PK)|
| title           | text    |
| subtitle        | text    |
| description     | text    |
| current_status  | text    |
| updated_at      | timestamp|

#### `skills` table
| Column      | Type    |
|-------------|---------|
| id          | uuid (PK)|
| name        | text    |
| category    | text    |
| icon        | text    |
| created_at  | timestamp|

#### `services` table
| Column      | Type    |
|-------------|---------|
| id          | uuid (PK)|
| title       | text    |
| description | text    |
| icon        | text    |
| created_at  | timestamp|

#### `projects` table
| Column      | Type    |
|-------------|---------|
| id          | uuid (PK)|
| title       | text    |
| description | text    |
| image_url   | text    |
| tech_stack  | text[]  |
| live_url    | text    |
| github_url  | text    |
| created_at  | timestamp|

#### `career` table
| Column      | Type    |
|-------------|---------|
| id          | uuid (PK)|
| title       | text    |
| company     | text    |
| period      | text    |
| description | text    |
| created_at  | timestamp|

Also create a **Storage bucket** named `portfolio` (public read access for images).

---

### 4. Configure Environment Variables

Copy the example below and create a `.env.local` file at the project root:

```env
# Admin Dashboard Password
ADMIN_PASSWORD=your_secure_password_here

# Supabase Connection
DATABASE_URL=postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres

# Supabase Public Client
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

# Supabase Service Role (server-side admin operations)
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Storage Bucket Name
SUPABASE_STORAGE_BUCKET=portfolio
```

> **Where to find Supabase keys:**  
> Supabase Dashboard → Your Project → **Settings** → **API**

---

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the dashboard.

---

## Environment Variables

| Variable                      | Required | Description                                      |
|-------------------------------|----------|--------------------------------------------------|
| `ADMIN_PASSWORD`              | ✅       | Password to log into the admin dashboard         |
| `DATABASE_URL`                | ✅       | PostgreSQL connection string (Supabase)          |
| `NEXT_PUBLIC_SUPABASE_URL`    | ✅       | Supabase project URL (exposed to browser)        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅     | Supabase anon/public key (exposed to browser)    |
| `SUPABASE_SERVICE_ROLE_KEY`   | ✅       | Service role key for privileged server operations|
| `SUPABASE_STORAGE_BUCKET`     | ✅       | Name of the Supabase storage bucket              |

> ⚠️ **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## Admin Dashboard

### Accessing the Dashboard

Navigate to `/admin` in your browser. If not logged in, you will be automatically redirected to `/admin/login`.

### Authentication

The dashboard uses a **simple cookie-based auth system**:

1. Navigate to `/admin/login`
2. Enter the password set in `ADMIN_PASSWORD`
3. On success, an `httpOnly` cookie (`admin_authenticated=true`) is set for **7 days**
4. The Next.js middleware (`src/middleware.ts`) enforces protection on all `/admin/*` routes

To **log out**, use the logout button in the dashboard navigation — this clears the auth cookie via `/api/auth/logout`.

---

### Dashboard Sections

| Section      | URL                   | What it manages                                      |
|--------------|-----------------------|------------------------------------------------------|
| Overview     | `/admin`              | Stats summary (skill count, projects, services, etc.)|
| Hero         | `/admin/hero`         | Name, title, subtitle, description, current status   |
| Skills       | `/admin/skills`       | Add / edit / delete skills with category and icon    |
| Services     | `/admin/services`     | Add / edit / delete services offered                 |
| Projects     | `/admin/projects`     | Add / edit / delete portfolio projects with images   |
| Career       | `/admin/career`       | Add / edit / delete career timeline entries          |

---

### Managing Content

#### ➕ Adding Items
1. Go to the relevant section (e.g., `/admin/projects`)
2. Fill in the form fields
3. For image uploads, use the file picker — images are uploaded to Supabase Storage via `/api/upload`
4. Click **Save** — changes appear on the public site immediately

#### ✏️ Editing Items
1. Click the **Edit** button next to any existing item
2. Modify the fields
3. Click **Update** to save changes

#### 🗑️ Deleting Items
1. Click the **Delete** button next to any item
2. Confirm the action — the item is permanently removed from the database

All data is fetched from and persisted to Supabase in real time. The public portfolio at `/` reads from the same database and reflects changes instantly.

---

## API Routes

| Method | Route                        | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/api/auth/login`            | Validate password and set auth cookie|
| POST   | `/api/auth/logout`           | Clear auth cookie                    |
| GET    | `/api/auth/check`            | Returns `{ authenticated: boolean }` |
| GET    | `/api/portfolio`             | Returns all portfolio data           |
| GET    | `/api/portfolio/hero`        | Hero section data                    |
| GET/POST/PUT/DELETE | `/api/portfolio/skills`   | CRUD for skills        |
| GET/POST/PUT/DELETE | `/api/portfolio/services` | CRUD for services      |
| GET/POST/PUT/DELETE | `/api/portfolio/projects` | CRUD for projects      |
| GET/POST/PUT/DELETE | `/api/portfolio/career`   | CRUD for career items  |
| POST   | `/api/upload`                | Upload image to Supabase Storage     |

---

## Deployment

### Docker

A `Dockerfile` is included for containerized deployment.

```bash
# Build the image
docker build -t portfolio_v4 .

# Run the container
docker run -p 3000:3000 --env-file .env.local portfolio_v4
```

### CI/CD with Jenkins

A `Jenkinsfile` is included for automated CI/CD pipelines. The pipeline typically:

1. Checks out the code
2. Installs dependencies (`npm install`)
3. Builds the Next.js project (`npm run build`)
4. Builds and pushes the Docker image
5. Deploys to the target server

Configure your Jenkins environment to inject the required environment variables as credentials or environment secrets.

---

## Scripts

| Script              | Command             | Description                        |
|---------------------|---------------------|------------------------------------|
| Development server  | `npm run dev`       | Start local dev server on port 3000|
| Production build    | `npm run build`     | Build optimized production bundle  |
| Production server   | `npm start`         | Start the production server        |
| Lint                | `npm run lint`      | Run ESLint checks                  |

---

## License

This project is private and personal. All rights reserved.



--- adding new commnads and other instructions.
