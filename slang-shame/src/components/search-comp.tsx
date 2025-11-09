import { useState, useMemo, useEffect } from 'react';

const SlangSearch = ({ dataSource = '/slang.json' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('term'); // 'term' or 'count'
  const [slangData, setSlangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load slang data from JSON file
  useEffect(() => {
    const fetchSlangData = async () => {
      try {
        setLoading(true);
        const response = await fetch(dataSource);
        if (!response.ok) {
          throw new Error(`Failed to load slang data: ${response.statusText}`);
        }
        const data = await response.json();
        setSlangData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSlangData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlangData();
  }, [dataSource]);

  // Filter and sort slang terms
  const filteredSlang = useMemo(() => {
    let results = slangData.filter((item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'count') {
      results.sort((a, b) => b.count - a.count);
    } else {
      results.sort((a, b) => a.term.localeCompare(b.term));
    }

    return results;
  }, [searchTerm, sortBy]);

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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Search Slang Terms</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by term or meaning..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sort Options */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setSortBy('term')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'term'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Sort by Term
        </button>
        <button
          onClick={() => setSortBy('count')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'count'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Sort by Popularity
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Found {filteredSlang.length} result{filteredSlang.length !== 1 ? 's' : ''}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredSlang.length > 0 ? (
          filteredSlang.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{item.term}</h3>
                  <p className="text-gray-600 text-sm">{item.meaning}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {item.count} uses
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No slang terms found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlangSearch;
