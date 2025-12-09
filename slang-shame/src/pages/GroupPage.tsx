import {useState, useEffect } from 'react';
import GroupTitle from '../components/GroupTitle';
import type { Suspects } from "../utils/types";
import { Link, useParams } from 'react-router';

import { listGroupSuspects } from '../utils/appwriteFunctions';
import PersonMugshot from '../components/PersonMugshot';

export const GroupPage = () => {
    const { group: groupName } = useParams();
    const [suspects, setSuspects] = useState<Suspects[]>([])

    useEffect(() => {
        (async () => {
        setSuspects(await listGroupSuspects(groupName));
        })();
    }, [groupName])

  return (
    <div className="min-h-screen bg-white dark:bg-(--color-black) transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <GroupTitle />
          <h1 className="text-4xl font-bold text-(--color-primary) dark:text-(--color-primary) mt-4">
            {groupName}
          </h1>
        </div>

        <div className="flex flex-wrap justify-center items-start gap-6 mb-12">
          {suspects.map((s) => (
            <PersonMugshot
              key={s.$id}
              suspectId={s.$id}
              firstName={s.firstName}
              lastName={s.lastName}
              avatarURL={s.avatarURL}
            />
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Link to={`/${groupName}/leaderboard`}>
            <div className="text-4xl font-bold text-(--color-primary) hover:text-(--color-secondary) transition-colors text-center px-8 py-4 border-4 border-(--color-primary) rounded-lg">
              Leaderboard
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GroupPage;