# CampusLens - College Discovery Platform MVP

A production-grade college discovery and comparison platform built with React, TypeScript, Next.js, and Tailwind CSS.

## Features

- Browse colleges with search, filters, and infinite loading
- View college details, courses, placements, and reviews
- Compare up to 3 colleges side by side
- Save favorites and comparison sets per user
- Use a simple demo auth flow with local persistence

## Tech Stack

- Frontend: React 18 + TypeScript
- Framework: Next.js 15
- Routing: Next.js App Router
- Styling: Tailwind CSS
- State Management: React Query and Zustand
- Forms: React Hook Form and Zod
- API Client: Axios

## Quick Start

### Prerequisites

- Node.js 18.18+ and npm

### Installation

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── auth/page.tsx
│   ├── colleges/page.tsx
│   ├── college/[id]/page.tsx
│   ├── compare/page.tsx
│   └── saved/page.tsx
├── screens/
│   ├── HomePage.tsx
│   ├── CollegesListingPage.tsx
│   ├── CollegeDetailPage.tsx
│   ├── ComparePage.tsx
│   ├── SavedPage.tsx
│   └── AuthPage.tsx
├── components/
├── contexts/
├── hooks/
├── services/
├── store/
├── types/
└── utils/
```

## Demo Credentials

Any email and password with at least 6 characters will work for the demo auth flow.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server

## License

MIT
