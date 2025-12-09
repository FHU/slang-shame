import { useState, useMemo, useEffect } from 'react';

interface SlangItem {
  term: string;
  dateAdded: string;
  partofSpeech: string;
}

interface PersonItem {
  firstName: string;
  lastName: string;
  title: string;
  avatarURL: string;
  dateAdded: string;
}

type SearchItem = SlangItem | PersonItem;

interface SearchComponentProps {
  slangDataSource?: string;
  peopleDataSource?: string;
}


const SlangSearch = ({ slangDataSource = '/slang.json', peopleDataSource = '/people/people.json' }: SearchComponentProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'slang' | 'people'>('slang');
  const [data, setData] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dataSource = searchType === 'slang' ? slangDataSource : peopleDataSource;

  // Load data from JSON file
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

  // Filter data
  const filteredData = useMemo(() => {
    try {
      return data.filter((item: SearchItem) => {
        // If we're searching slang terms
        if (searchType === 'slang') {
          const slangItem = item as SlangItem;
          const term = slangItem.term ? slangItem.term.toLowerCase() : '';
          const partOfSpeech = slangItem.partofSpeech ? slangItem.partofSpeech.toLowerCase() : '';
          return (
            term.includes(searchTerm.toLowerCase()) ||
            partOfSpeech.includes(searchTerm.toLowerCase())
          );
        } else {
          // If we're searching people(faculty/staff)
          const personItem = item as PersonItem;
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

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600">Loading slang data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">Error loading slang data</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Search</h1>

        {/* Search Type Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Type
          </label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'slang' | 'people')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="slang">Slang Terms</option>
            <option value="people">People</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder={searchType === 'slang' ? 'Search by term or part of speech...' : 'Search by name or title...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSearchTerm('')}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Clear
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((item: SearchItem, index: number) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              {searchType === 'slang' ? (
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{(item as SlangItem).term}</h3>
                  <p className="text-gray-600 text-sm">{(item as SlangItem).partofSpeech}</p>
                  <p className="text-gray-500 text-xs">Added: {(item as SlangItem).dateAdded}</p>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">
                      {(item as PersonItem).firstName} {(item as PersonItem).lastName}
                    </h3>
                    <p className="text-gray-600 text-sm">{(item as PersonItem).title}</p>
                    <p className="text-gray-500 text-xs">Added: {(item as PersonItem).dateAdded}</p>
                  </div>
                  {(item as PersonItem).avatarURL && (
                    <img
                      src={(item as PersonItem).avatarURL}
                      alt={(item as PersonItem).firstName}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No {searchType} found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlangSearch;
