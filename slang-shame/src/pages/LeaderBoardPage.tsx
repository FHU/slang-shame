// import { Link, useParams } from 'react-router';

// const LeaderboardPage = () => {
//   const { group } = useParams();

//   return (
//     <div className="min-h-screen bg-white dark:bg-(--color-black) transition-colors flex flex-col items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-6xl font-bold text-(--color-primary) mb-8">
//           🚧 Under Construction 🚧
//         </h1>

//         <Link
//           to={`/${group}`}
//           className="inline-block mt-8 text-2xl font-semibold text-(--color-secondary) hover:text-(--color-primary) transition-colors underline"
//         >
//           Back
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LeaderboardPage

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { listGroupSuspects, listSlang } from "../utils/appwriteFunctions";

interface Suspect {
  $id: string;
  firstName: string;
  lastName: string;
}

interface Slang {
  $id: string;
  word: string;
}

export default function LeaderboardPage() {
  const { group: groupName } = useParams();
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [slang, setSlang] = useState<Slang[]>([]);

  // Load suspects for this group
  useEffect(() => {
    async function loadSuspects() {
      const list = await listGroupSuspects(groupName);
      const mapped: Suspect[] = list.map((s: any) => ({
        $id: s.$id,
        firstName: s.firstName,
        lastName: s.lastName,
      }));
      mapped.sort((a, b) => a.$id.localeCompare(b.$id));
      setSuspects(mapped);
    }
    loadSuspects();
  }, [groupName]);

  // Load all slang terms
  useEffect(() => {
    async function loadSlang() {
      const list = await listSlang();
      const mapped: Slang[] = list.map((t: any) => ({
        $id: t.$id,
        word: t.word,
      }));
      mapped.sort((a, b) => a.$id.localeCompare(b.$id));
      setSlang(mapped);
    }
    loadSlang();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-(--color-black) px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-(--color-primary) mb-8">
        {groupName} Leaderboards
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* Suspects Leaderboard */}
        <div className="border rounded-lg p-6 shadow bg-(--color-secondary-foreground)">
          <h2 className="text-2xl font-bold mb-4 text-(--color-primary)">Suspects</h2>

          {suspects.map((s) => (
            <div
              key={s.$id}
              className="p-3 mb-2 rounded bg-gray-100 dark:bg-gray-800 text-lg font-semibold"
            >
              {s.firstName} {s.lastName}
            </div>
          ))}

          {suspects.length === 0 && (
            <p className="text-gray-500">No suspects found.</p>
          )}
        </div>

        {/* Slang Leaderboard */}
        <div className="border rounded-lg p-6 shadow bg-(--color-secondary-foreground)">
          <h2 className="text-2xl font-bold mb-4 text-(--color-primary)">Slang Terms</h2>

          {slang.map((t) => (
            <div
              key={t.$id}
              className="p-3 mb-2 rounded bg-gray-100 dark:bg-gray-800 text-lg font-semibold"
            >
              {t.word}
            </div>
          ))}

          {slang.length === 0 && (
            <p className="text-gray-500">No slang terms found.</p>
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