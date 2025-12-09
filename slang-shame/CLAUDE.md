# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Slang Shame is a React + TypeScript + Vite application that tracks and reports slang word usage within groups. It uses Appwrite as the backend database service for managing groups, suspects (people who use slang), reporters, slang words, and reports.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server with Vite (localhost:5173)
npm run preview      # Preview production build locally
```

### Building and Linting
```bash
npm run build        # Compile TypeScript and build for production (tsc -b && vite build)
npm run lint         # Run ESLint on the codebase
npm run lint -- --fix  # Auto-fix linting issues
```

### Type Checking
```bash
npx tsc --noEmit     # Run TypeScript compiler without emitting output (no build)
npx tsc -b           # Incremental TypeScript build (used in npm run build)
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

The `db` object from `src/database.tsx` provides type-safe access to all tables with full CRUD operations:

```typescript
import { db } from './database';
import { Query } from 'appwrite';

// LIST - Get all rows or with queries
const { rows, total } = await db.groups.list();
const activeGroups = await db.groups.list([Query.equal('isActive', true)]);

// GET - Fetch a single row by ID
const group = await db.groups.get('row-id-here');

// CREATE - Add a new row (rowId optional, auto-generated if omitted)
const newGroup = await db.groups.create({
  groupName: 'New Group',
  isActive: true
});

// CREATE with custom ID
const groupWithId = await db.groups.create(
  { groupName: 'Custom ID Group', isActive: true },
  'custom-row-id'
);

// UPDATE - Modify existing row (partial updates supported)
const updatedGroup = await db.groups.update('row-id-here', {
  isActive: false
});

// DELETE - Remove a row
await db.groups.delete('row-id-here');
```

All methods are fully typed - TypeScript will enforce correct field types and autocomplete available fields. The `create()` and `update()` methods accept `Partial<>` data, so you only need to provide the fields you want to set.

### Type System

All Appwrite types extend `Models.Row` and are defined in `src/utils/types.ts`. Relationships are typed as nested objects (e.g., `Reports.suspectID` is of type `Suspects`).

## Styling

Uses Tailwind CSS v4 with the Vite plugin (`@tailwindcss/vite`).

## Key Development Patterns

### Component Architecture

Components follow a standard React + TypeScript pattern:
- Props are typed as `TypeName` interfaces at the top of the component file
- Functional components with hooks (useState, useParams, useNavigate)
- Tailwind classes for styling (no external CSS files)

### Routing Patterns

- **User Routes**: Dynamic `/:group/*` pattern for group-specific pages
  - `/:group` - Main group page displaying suspects
  - `/:group/leaderboard` - Report statistics
  - `/:group/lastreport` - Recently submitted reports
  - `/:group/report/:id` - Individual suspect report submission
- **Dev Routes**: All dev pages under `/dev/*` for testing and API management

### Database Interaction Patterns

The `db` object provides a consistent interface. Common patterns:

```typescript
// Fetch with queries (most common)
const suspects = await db.suspects.list([Query.equal("groupID", groupId)]);

// Single row operations
const suspect = await db.suspects.get(suspectId);

// Creating reports with permissions (all CRUD allowed)
const report = await db.reports.create(reportData, undefined,
  [Permission.read(Role.any()), Permission.write(Role.any()),
   Permission.delete(Role.any()), Permission.update(Role.any())]);
```

### Utility Function Patterns

`src/utils/appwriteFunctions.ts` contains business logic that:
- Wraps multi-step database operations (e.g., `sendReport`)
- Handles error cases silently (logs to console, returns empty arrays/undefined)
- Returns typed data or empty values on failure

## Known Codebase Notes

- **ReportPage.tsx** and **appwriteFunctions.ts** are currently under development (uncommitted changes on Slang-Call branch)
- Dev pages are unstyled and primarily for testing/debugging
- Reporter IDs are currently hardcoded as "dev" in development
- Search components (`SearchBar.tsx`, `search-comp.tsx`) - naming suggests refactoring may be needed
- No formal error handling UI - errors logged to console only
- Calls to the appwrite database should be put into appwriteFunctions.ts
- Use tailwind styling and the color variables specified