//import React from 'react'
import GroupTitle from '../components/GroupTitle';
//import PersonSelect from '../components/PersonSelect';
import GroupLeaderboard from '../components/GroupLeaderboard';


import { Link, useParams } from 'react-router'; 

export const GroupPage = () => {
    const params = useParams();


  return (
    <>
    
  <div>
    <GroupTitle />
    {params.group}
  </div>

  <div className="flex justify-center items-center mt-4">
    <Link
      to={`/${params.group}/report/123`}
      className="text-4xl font-bold text-blue-600 text-center no-underline"
  >
      Report Someone
    </Link>

  </div>

  <div className="flex justify-center items-center mt-4">
        <Link to={`/${params.group}/leaderboard`}>
          <div className="text-4xl font-bold text-blue-600 text-center no-underline">
            Leaderboard
          </div>
        </Link>
      </div>


  
   </>
  )
}

export default GroupPage
