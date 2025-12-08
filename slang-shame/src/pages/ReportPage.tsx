import { useState } from 'react'
import SlangList from '../components/SlangList'
import { Link, useParams } from 'react-router';

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
    <div>
      <h1>Select the Slang the Perpetrator Said</h1>

      <SlangList
        selectedId={selectedSlangId}
        onSelect={(id) => setSelectedSlangId(id)}
      />

      {/*This will be the REPORT button.*/}
      <button disabled={!selectedSlangId} onClick={sendReport}>
        Confirm Selection
      </button>
    </div>


    {/*This is the back button*/}
    <Link to={`/${groupName}`} style={{ display: 'block', marginTop: '20px', color: 'blue' }}>
    Back to {groupName}
    </Link>
    </>
  )
}

export default ReportPage