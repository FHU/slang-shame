import SlangSelect from './SlangSelect';
import { useState, useEffect } from 'react';
import { db } from '../database';
import type { Slang } from '../utils/types';

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function SlangList({selectedId, onSelect}: Props) {
  const [slang, setSlang] = useState<Slang[]>([])

    useEffect(() => {
        const getSlang = async () => {
            try {
                const {total, rows} = await db.slang.list();
                console.log(total)
                console.log(rows);
                setSlang(rows);
                }
            catch(error){
                console.log(error)
            }
        };

        getSlang();
    }, [])
  return (
<>
   {slang.map((row) => (
        <SlangSelect
          key={row.$id}
          word={row.word}
          selected={row.$id === selectedId}
          onClick={() => onSelect(row.$id)}
        />
      ))}
</>
  )
}

export default SlangList