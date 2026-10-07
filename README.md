# React Meetups

A small meetup-listing app built with **Next.js (Pages Router)**, **TypeScript** and **MongoDB Atlas**. Browse meetups, view details and add your own.

## Features

- Browse all meetups on the home page (static generation with incremental revalidation)
- Meetup details page with dynamic routing (`/[meetupId]`)
- Add a new meetup via a form (`/new-meetup`) backed by an API route
- Data stored in MongoDB Atlas
- Page-specific `<title>` and meta description for SEO
- CSS Modules for component-scoped styling

## Tech Stack

- [Next.js 15](https://nextjs.org/) (Pages Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) + MongoDB Node.js driver
- CSS Modules

## Project Structure

```
components/
  layout/      Layout, MainNavigation
  meetups/     MeetupList, MeetupItem, MeetupDetail, NewMeetupForm
  ui/          Card
pages/
  _app.tsx             App wrapper with Layout
  index.tsx            Home page (all meetups)
  [meetupId]/index.tsx Meetup details page
  new-meetup/index.tsx Add meetup page
  api/new-meetup.ts    API route (POST /api/new-meetup)
styles/        Global styles
types/         Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (20+ recommended)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### MongoDB setup

1. Create a cluster in MongoDB Atlas.
2. Create a database user (**Database Access**).
3. Allow your IP address (**Network Access**).
4. Copy the connection string (**Connect → Drivers**) and add the database name `meetups` before the `?`:

```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/meetups?retryWrites=true&w=majority
```

5. Put the connection string into the places where `MongoClient.connect(...)` is called:
   - `pages/index.tsx`
   - `pages/[meetupId]/index.tsx` (two places)
   - `pages/api/new-meetup.ts`

> **Warning:** never commit real credentials to a public repository. Prefer storing the connection string in an environment variable (e.g. `.env.local`) and reading it via `process.env`.

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Create a production build        |
| `npm run start` | Start the production server      |

## Routes

| Route          | Description               |
| -------------- | ------------------------- |
| `/`            | All meetups               |
| `/[meetupId]`  | Meetup details            |
| `/new-meetup`  | Add a new meetup          |
| `/api/new-meetup` | `POST` endpoint that saves a meetup |

