# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Slang Shame is a React + TypeScript + Vite application that tracks and reports slang word usage within groups. It uses Appwrite as the backend database service for managing groups, suspects (people who use slang), reporters, slang words, and reports.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server with Vite
npm run preview      # Preview production build locally
```

### Building and Linting
```bash
npm run build        # Compile TypeScript and build for production (tsc -b && vite build)
npm run lint         # Run ESLint on the codebase
```

## Architecture

### Database Layer (Appwrite)

The application uses Appwrite's TablesDB with the following data model:

- **groups**: Main organizational units (e.g., "FHU")
- **suspects**: People who are tracked for slang usage (linked to groups)
- **reporters**: Anonymous users identified by IP address (many-to-many with groups)
- **slang**: Slang word dictionary with definitions, examples, and metadata
- **reports**: Individual slang usage incidents (links reporter, suspect, and slang word)
- **subgroups**: Optional sub-divisions within groups (many-to-many with suspects)

Key relationships:
- Reports tie together a reporter, suspect, and slang word with a timestamp
- Suspects belong to one group (many-to-one)
- Reporters can report to multiple groups (many-to-many)
- Report status can be: "Approved", "Disapproved", "Suspect", "Assumed" (default)

### Configuration Files

- **appwrite.config.json**: Complete Appwrite schema definition including all table structures and relationships
- **.env**: Contains Appwrite project credentials and table IDs (prefixed with VITE_)
  - Never commit changes to .env with actual credentials
  - Use environment variable naming: `VITE_APPWRITE_*` for Vite access

### Source Code Structure

**Core Files:**
- `src/appwriteConfig.tsx`: Initializes Appwrite client and database connection
- `src/database.tsx`: Type-safe database API wrapper that provides typed methods for each table (currently implements `list()` method)
- `src/utils/types.ts`: TypeScript type definitions for all Appwrite tables (auto-generated compatible)

**Routing:**
- `src/App.tsx`: Main routing - user-facing pages use URL pattern `/:group` (e.g., `/FHU`)
- `src/routes/DevRoutes.tsx`: Developer pages under `/dev/*` path (testing, API management, reports)

**Pages:**
- User pages: `GroupPage`, `LeaderBoardPage`, `ReportPage`
- Dev pages: `TestPage`, `TestSlangSearch`, `TestSuspectSearch`, `DevGroupEdit`, `DevSuspectEdit`, `DevSlangEdit`, `DevReports`

**Components:**
- `GroupLeaderboard.tsx`, `GroupTitle.tsx`: Display group information
- `PersonSelect.tsx`, `SlangSelect.tsx`: Selection components for suspects and slang words
- `ReportButton.tsx`: Submit new reports
- `SearchBar.tsx`, `search-comp.tsx`: Search functionality

### Database API Usage

The `db` object from `src/database.tsx` provides type-safe access to all tables:

```typescript
import { db } from './database';
import { Query } from 'appwrite';

// List all rows in a table
const groups = await db.groups.list();

// List with queries
const activeGroups = await db.groups.list([
  Query.equal('isActive', true)
]);
```

Currently only `list()` is implemented. To add more methods (get, create, update, delete), uncomment and implement them in `src/database.tsx`.

### Type System

All Appwrite types extend `Models.Row` and are defined in `src/utils/types.ts`. Relationships are typed as nested objects (e.g., `Reports.suspectID` is of type `Suspects`).

## Styling

Uses Tailwind CSS v4 with the Vite plugin (`@tailwindcss/vite`).
