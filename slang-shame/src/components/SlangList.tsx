import SlangSelect from './SlangSelect';
import { useState, useEffect } from 'react';
import { listSlang } from '../utils/appwriteFunctions';
import type { Slang } from '../utils/types';

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function SlangList({selectedId, onSelect}: Props) {
  const [slang, setSlang] = useState<Slang[]>([])

    useEffect(() => {
            (async () => {
            setSlang(await listSlang());
            })();
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