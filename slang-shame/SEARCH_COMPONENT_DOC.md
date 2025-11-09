# Search Component Documentation

## Overview

The `SlangSearch` component is a reusable React component that provides live search functionality for multiple data types. It currently supports searching **slang terms** and **people** with a dropdown toggle to switch between them.

## Features

- ✅ Live search filtering (filters as you type)
- ✅ Toggle between search types (Slang Terms / People)
- ✅ Clear button to reset search
- ✅ Dynamic placeholder text based on search type
- ✅ Profile pictures for people results with error handling
- ✅ Results counter showing number of matches
- ✅ Loading state while fetching data
- ✅ Error handling with user-friendly messages
- ✅ TypeScript support with full type safety

## File Location

```
src/components/search-comp.tsx
```

## Component Structure

### Interfaces

#### `SlangItem`
Represents a single slang term in the database.

```typescript
interface SlangItem {
  term: string;           // The slang word/phrase
  dateAdded: string;      // When the term was added
  partofSpeech: string;   // Grammatical category (noun, verb, etc.)
}
```

#### `PersonItem`
Represents a person (staff member, faculty, etc.) in the database.

```typescript
interface PersonItem {
  firstName: string;      // Person's first name
  lastName: string;       // Person's last name
  title: string;          // Job title or position
  avatarURL: string;      // URL to profile picture
  dateAdded: string;      // When the person was added
}
```

#### `SearchComponentProps`
Props that can be passed to the component.

```typescript
interface SearchComponentProps {
  slangDataSource?: string;      // Path to slang JSON file (default: '/slang.json')
  peopleDataSource?: string;     // Path to people JSON file (default: '/people/people.json')
}
```

### State Management

The component uses React hooks to manage its state:

```typescript
const [searchTerm, setSearchTerm] = useState<string>('');           // Current search input
const [searchType, setSearchType] = useState<'slang' | 'people'>('slang');  // Active search type
const [data, setData] = useState<SearchItem[]>([]);                // Loaded data array
const [loading, setLoading] = useState<boolean>(true);             // Loading state
const [error, setError] = useState<string | null>(null);           // Error message
```

## How It Works

### 1. Data Loading (useEffect)

When the component mounts or when the `dataSource` changes, it automatically fetches the JSON data:

```typescript
const dataSource = searchType === 'slang' ? slangDataSource : peopleDataSource;

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(dataSource);
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
      }
      const fetchedData = await response.json();
      setData(fetchedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [dataSource]);
```

### 2. Filtering (useMemo)

The component filters data in real-time as the user types. It uses `useMemo` for performance optimization:

```typescript
const filteredData = useMemo(() => {
  try {
    return data.filter((item: SearchItem) => {
      if (searchType === 'slang') {
        // Search by term or part of speech
        const term = slangItem.term ? slangItem.term.toLowerCase() : '';
        const partOfSpeech = slangItem.partofSpeech ? slangItem.partofSpeech.toLowerCase() : '';
        return (
          term.includes(searchTerm.toLowerCase()) ||
          partOfSpeech.includes(searchTerm.toLowerCase())
        );
      } else {
        // Search by name or title
        const firstName = personItem.firstName ? personItem.firstName.toLowerCase() : '';
        const lastName = personItem.lastName ? personItem.lastName.toLowerCase() : '';
        const title = personItem.title ? personItem.title.toLowerCase() : '';
        return (
          `${firstName} ${lastName}`.includes(searchTerm.toLowerCase()) ||
          title.includes(searchTerm.toLowerCase())
        );
      }
    });
  } catch (err) {
    console.error('Filter error:', err);
    return data;
  }
}, [searchTerm, data, searchType]);
```

### 3. Rendering

The component renders different UI based on its state:

- **Loading**: Shows "Loading slang data..." message
- **Error**: Displays error message in a red box
- **Success**: Shows search dropdown, input field, clear button, results counter, and filtered results

## Usage

### Basic Usage

Import the component and use it with default props:

```tsx
import SlangSearch from '../components/search-comp';

function MyPage() {
  return <SlangSearch />;
}
```

### Custom Data Sources

Pass custom paths to your JSON files:

```tsx
<SlangSearch
  slangDataSource="/data/slang.json"
  peopleDataSource="/data/staff.json"
/>
```

### Integration Example

Here's how to integrate it into a page:

```tsx
import { useState, useEffect } from 'react';
import SlangSearch from '../components/search-comp';

function MyPage() {
  return (
    <div className="page-container">
      <h1>Search Portal</h1>
      <SlangSearch
        slangDataSource="/slang.json"
        peopleDataSource="/people/people.json"
      />
    </div>
  );
}

export default MyPage;
```

## Data Format

### Slang JSON Format

Your `slang.json` file should be an array of slang items:

```json
[
  {
    "term": "GOAT",
    "dateAdded": "11/06/2025",
    "partofSpeech": "noun/acronym"
  },
  {
    "term": "slay",
    "dateAdded": "11/06/2025",
    "partofSpeech": "verb"
  }
]
```

### People JSON Format

Your people JSON files should be an array of person objects:

```json
[
  {
    "firstName": "Matt",
    "lastName": "Vega",
    "title": "Dean, College of Education",
    "avatarURL": "https://example.com/avatar.jpg",
    "dateAdded": "11/06/2025"
  }
]
```

## Component Behavior

### Search Type Dropdown

Users can toggle between two search modes:
- **Slang Terms**: Searches by term and part of speech
- **People**: Searches by full name (first + last) and job title

### Live Filtering

As users type in the search box:
1. The search term is converted to lowercase
2. All data items are filtered to match the search term
3. Results update instantly without requiring a button click
4. Results counter updates showing matches found

### Clear Button

Clicking the Clear button:
1. Resets the search input to empty string
2. Shows all available data again
3. Updates the results counter

### Image Handling

When displaying people:
- Avatar images are shown in a 64x64px rounded square
- If image fails to load, it's hidden automatically
- Doesn't break the UI if avatar URL is invalid

## Error Handling

### Network Errors

If the JSON file fails to load:
- Error message is displayed in a red box
- User is informed of what went wrong
- Data array is emptied
- Loading state is cleared

### Data Processing Errors

If there's an error during filtering:
- Error is logged to console
- All data is returned (no filter applied)
- Component continues to work

### Missing Fields

If a data item is missing expected fields:
- Empty string is used as fallback
- Component doesn't crash
- Field is treated as not matching any search query

## Performance Considerations

### useMemo Hook

The filtering logic uses `useMemo` to:
- Avoid re-filtering on every render
- Only recalculate when `searchTerm`, `data`, or `searchType` changes
- Improve performance with large datasets

### Null/Undefined Checks

All string fields are checked for existence before calling `.toLowerCase()`:
```typescript
const term = slangItem.term ? slangItem.term.toLowerCase() : '';
```

This prevents runtime errors with incomplete data.

## Styling

The component uses Tailwind CSS classes for styling:

- Search dropdown: `px-4 py-2 border border-gray-300 rounded-lg`
- Search input: `flex-1 px-4 py-2 border border-gray-300 rounded-lg`
- Clear button: `px-4 py-2 bg-gray-300 text-gray-700 rounded-lg`
- Result items: `bg-white p-4 rounded-lg border border-gray-200`
- Error box: `bg-red-100 border border-red-400 text-red-700`

You can customize these classes by editing the component.

## Testing

The component is currently tested at:
```
http://localhost:5173/test
```

### Test Steps

1. Select "Slang Terms" from dropdown
2. Type a word to search slang
3. Verify results filter in real-time
4. Click Clear button
5. Select "People" from dropdown
6. Type a name to search people
7. Verify people results with avatars
8. Test error handling by providing invalid data source

## Common Issues & Solutions

### No results showing

**Issue**: Search returns no results
- **Solution**: Verify JSON file path is correct
- **Solution**: Ensure data in JSON matches expected format
- **Solution**: Check browser console for load errors

### Images not displaying

**Issue**: Avatar images don't load
- **Solution**: Verify avatar URLs are correct
- **Solution**: Check CORS settings on image server
- **Solution**: This is handled gracefully - image just won't show

### Component loads slowly

**Issue**: Slow performance with large datasets
- **Solution**: Consider pagination (not implemented yet)
- **Solution**: The useMemo hook helps - add more filtering if needed

## Future Enhancements

Possible improvements:
- Pagination for large result sets
- Search history
- Advanced filters (search within departments)
- Sorting options
- Export results functionality
- Combining both search types in a single view

## Support

For issues or questions about this component:
1. Check the error messages in Safari Developer Console
2. Verify JSON file paths and format
3. Ensure data types match the interfaces
