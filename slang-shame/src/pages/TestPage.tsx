import {useState, useEffect } from 'react';
import { db } from '../appwriteConfig';

function TestPage() {
    const [groups, setGroups] = useState<any[]>([])

    useEffect(() => {
        getGroups();
    }, [])

    const getGroups = async () => {
        try {
            const {total, rows} = await db.listRows({
                databaseId:'690fa680000a3526ba6a', tableId:'groups'})
            console.log(total)
            console.log(rows);
            setGroups(rows);
        }
        catch(error){
            console.log(error)
        }
    }
    return (
    <div className='m-2'>
        <h1> Here is the sample groups:</h1>
        <div className='m-2'>
        {groups.map((g) => (
    <article className='border-4 border-black' key={g.$id}>
      <h3 className='text-2xl'>{g.groupName}</h3>
      <p>Active: {g.isActive ? 'Yes' : 'No'}</p>
      <p>Suspects: {g.suspectCount ? g.suspectCount : <span>null</span>}</p>
      <p>Reporters: {g.reporterCount ? g.reporterCount : <span>null</span>}</p>
    </article>
    
  ))}
  </div>
    </div>
    )
}

export default TestPage
