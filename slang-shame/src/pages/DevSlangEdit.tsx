import {useState, useEffect } from 'react';
import { db } from '../database';
import type { Slang } from "../utils/types";
function DevSlangEdit() {
const [slang, setSlang] = useState<Slang[]>([])

useEffect(() => {
    getSlang();
}, [])
const getSlang = async () => {
        try {
            const {total, rows} = await db.slang.list()
            console.log(total)
            console.log(rows);
            setSlang(rows);
        }
        catch(error){
            console.log(error)
        }
}

const updateSlang = async (rowID: string, updates: Record<string, unknown> ) => {
    try {
        db.slang.update(rowID, updates)
    }
    catch(error){
        console.log(error)
    }
}

  return (
    <div>
        <h1>
            Page for Devs to Add, Edit and Remove Slang via API
        </h1>
        <p>
            This should be able to add new slang and edit already made slang
            to better work with the Appwrite backend table 'slang'
        </p>
        <p>
            The parts of speech that can be add to partOfSpeech column of a
            slang should just be these:
            <ul>
                <li>Noun</li>
                <li>Verb</li>
                <li>Adverb</li>
                <li>Adjective</li>
                <li>Prepositions</li>
                <li>Interjection</li>
                <li>Onomatopoeia</li>
                <li>Prefix</li>
                <li>Suffix</li>
            </ul>
            If there is extra stuff needed, let the team know.
        </p>
        {slang.map((s) => (<article  className='border-4 border-black' key={s.$id}>
             <p className='text-2xl'>{s.word}</p>
             <p></p>
             </article>))}
    </div>
  )
}

export default DevSlangEdit