import { useState } from 'react'
import SlangList from '../components/SlangList'
import { Link, useParams } from 'react-router';

import PersonSelect from '../components/PersonSelect';

const ReportPage = () => {
    const {group:groupName, id:suspectID} = useParams()
    const [selectedSlangId, setSelectedSlangId] = useState<string | null>(null);
    
    // This would be the report button
    const sendReport = () => {
      if (!selectedSlangId) return;
      console.log("User confirmed slang ID:", selectedSlangId);
      console.log("Suspect is", suspectID);
      console.log("From Group", groupName);
      console.log("Reported by dev")
      // Do whatever next (save, navigate, mutate, etc)
  };
  return (
    <>
    <div> Welcome to the report page!</div>
    <div> How would you like to Report?</div>
    <div>
      <h1>Select a Slang</h1>

      <SlangList
        selectedId={selectedSlangId}
        onSelect={(id) => setSelectedSlangId(id)}
      />

      {/*This will be the REPORT button.*/}
      <button disabled={!selectedSlangId} onClick={sendReport}>
        Confirm Selection
      </button>
    </div>
    <PersonSelect />
    {/*This is the back button*/}
    <Link to={`/${groupName}`} style={{ display: 'block', marginTop: '20px', color: 'blue' }}>
    Back
    </Link>
    </>
  )
}

export default ReportPage