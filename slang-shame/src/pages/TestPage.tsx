import {useState, useEffect } from 'react';
import { db } from '../appwriteConfig';
import SlangSearch from '../components/search-comp';

const slangData = "PLACEHOLDER"

const fetchSlangData = async () => {
  const res = await fetch(slangData);
  const data = await res.json();
  console.log(data);
  return data;
};

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
        <h1> Search Component Test</h1>
        <SlangSearch slangDataSource="/slang.json" peopleDataSource="/people/people.json" />

        <h2 className='mt-8'> Here is the sample groups:</h2>
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
