import {useState, useEffect } from 'react';
import GroupTitle from '../components/GroupTitle';
import type { Suspects } from "../utils/types";
import { Link, useParams } from 'react-router';

import { listGroupSuspects } from '../utils/appwriteFunctions';
//import PersonMugshot from '../components/PersonMugshot'
import ReportButton from '../components/SelectPersonToReportButton';

export const GroupPage = () => {
    const { group: groupName } = useParams();
    const [suspects, setSuspects] = useState<Suspects[]>([])

    useEffect(() => {
        (async () => {
        setSuspects(await listGroupSuspects(groupName));
        })();
    }, [groupName])

  return (
    <>
    
  <div>
    <GroupTitle />
    {groupName}
  </div>

  <div className="flex justify-center items-center mt-4">
    {/*I would like for this to map to the component "PersonMugshot"*/}
    {suspects.map((s) => (
            <article className='border-4 border-black' key={s.$id}>
              {s.avatarURL && <img src={s.avatarURL}></img>}
              <ReportButton reportId={s.$id} firstName={s.firstName} lastName={s.lastName}/>
            </article> ))}


  </div>

  <div className="flex justify-center items-center mt-4">
        <Link to={`/${groupName}/leaderboard`}>
          <div className="text-4xl font-bold text-blue-600 text-center no-underline">
            Leaderboard
          </div>
        </Link>
      </div>


  
   </>
  )
}

export default GroupPage
