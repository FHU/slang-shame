import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getTopReports, type LeaderboardEntry } from "../utils/appwriteFunctions";

export default function LeaderboardPage() {
  const { group: groupName } = useParams();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard data
  useEffect(() => {
    async function loadLeaderboard() {
      const data = await getTopReports(groupName);
      setLeaderboard(data);
    }
    loadLeaderboard();
  }, [groupName]);

  return (
    <div className="min-h-screen bg-white dark:bg-(--color-black) px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-(--color-primary) mb-8">
        {groupName} Leaderboards
      </h1>

      <div className="max-w-4xl mx-auto">

        {/* Top Reporters Leaderboard */}
        <div className="border rounded-lg p-6 shadow bg-(--color-secondary-foreground)">
          <h2 className="text-3xl font-bold mb-6 text-(--color-primary) text-center">Top Suspects</h2>

          {leaderboard.map((entry, index) => (
            <div key={entry.suspect.$id} className="mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  #{index + 1} {entry.suspect.firstName} {entry.suspect.lastName}
                  {/* Show title for all suspects */}
                  <span className="ml-2 text-sm text-(--color-secondary) font-normal">
                    ({entry.suspect.title})
                  </span>
                </h3>
                <span className="text-lg font-semibold text-(--color-primary)">
                  {entry.totalReports} report{entry.totalReports !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Slang breakdown */}
              {entry.slangUsage.length > 0 && (
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Slang used: </span>
                  {entry.slangUsage
                    .sort((a, b) => b.count - a.count)
                    .map((slang, idx) => (
                      <span key={slang.slang.$id}>
                        {slang.slang.word} ({slang.count}x)
                        {idx < entry.slangUsage.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                </div>
              )}
            </div>
          ))}

          {leaderboard.length === 0 && (
            <p className="text-gray-500 text-center">No reports found yet. Start reporting to see the leaderboard!</p>
          )}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          to={`/${groupName}`}
          className="text-xl font-semibold underline text-(--color-secondary)"
        >
          Back to {groupName}
        </Link>
      </div>
    </div>
  );
}
