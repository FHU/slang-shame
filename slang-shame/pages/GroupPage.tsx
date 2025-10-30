//import React from 'react'
import GroupTitle from '../components/GroupTitle';
import PersonSelect from '../components/PersonSelect';
import GroupLeaderboard from '../components/GroupLeaderboard';

import {useParams } from 'react-router';


export const GroupPage = () => {
    const params = useParams();


  return (
    <>
    <div><GroupTitle />{params.group}</div>
    <div>
        <h1>People To Report</h1>
        <PersonSelect />
    </div>
    <GroupLeaderboard />
    </>
  )
}

export default GroupPage