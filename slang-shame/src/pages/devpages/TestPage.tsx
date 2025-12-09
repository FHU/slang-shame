import {useState, useEffect } from 'react';
import { db } from '../../database';
import SlangSearch from '../../components/search-comp';
import type { Groups } from "../../utils/types";

const slangData = "PLACEHOLDER"

const fetchSlangData = async () => {
  const res = await fetch(slangData);
  const data = await res.json();
  console.log(data);
  return data;
};

function TestPage() {
    const [groups, setGroups] = useState<Groups[]>([])

    useEffect(() => {
        getGroups();
    }, [])

    const getGroups = async () => {
        try {
            const {total, rows} = await db.groups.list()
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
