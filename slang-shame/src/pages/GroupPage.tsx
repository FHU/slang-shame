import {useState, useEffect } from 'react';
import { db } from '../database';
import GroupTitle from '../components/GroupTitle';
//import PersonSelect from '../components/PersonSelect';
//import GroupLeaderboard from '../components/GroupLeaderboard';
import type { Suspects } from "../utils/types";
import { Link, useParams } from 'react-router'; 
import { Query } from "appwrite";
import ReportButton from '../components/ReportButton';

export const GroupPage = () => {
    const { group: groupName } = useParams();
    const [suspects, setSuspects] = useState<Suspects[]>([])

    useEffect(() => {
        const getSuspects = async () => {
            try {
                const {total, rows} = await db.groups.list([Query.equal("groupName", groupName || "")]);
                console.log(total)
                console.log(rows);

                // Only fetch suspects if we found a group
                if (rows.length > 0) {
                    const suspectsResult = await db.suspects.list([Query.equal("groupID", rows[0].$id)]);
                    console.log(suspectsResult.total)
                    console.log(suspectsResult.rows);
                    setSuspects(suspectsResult.rows);
                }
            }
            catch(error){
                console.log(error)
            }
        };

        getSuspects();
    }, [groupName])

  return (
    <>
    
  <div>
    <GroupTitle />
    {groupName}
  </div>

  <div className="flex justify-center items-center mt-4">
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
