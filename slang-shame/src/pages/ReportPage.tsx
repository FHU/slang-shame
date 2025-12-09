import { useState } from 'react'
import SlangList from '../components/SlangList'
import { Link, useParams } from 'react-router';
// import PersonSelect from '../components/PersonSelect';
import { databases } from "../appwrite";
// import { Query } from "appwrite";

interface SlangTerm {
  $id: string;
  partOfSpeech: string;
  word: string;
  definition: string;
  isActive: boolean;
  exampleUsage: string;
}

interface FacultyMember {
  $id: string;
  firstName: string;
  lastName: string;
  title: string;
  avatarURL: string;
}

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

export default function ReportPage() {
  const params = useParams();
  const [slangTerms, setSlangTerms] = useState<SlangTerm[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);

    useEffect(() => {
      const getSlang = async () => {
        try {
          const res = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SLANG_TABLE
          );

          const mapped: SlangTerm[] = res.documents.map((doc: any) => ({
            $id: doc.$id,
            word: doc.word,
            partOfSpeech: doc.partOfSpeech,
            definition: doc.definition,
            isActive: doc.isActive,
            exampleUsage: doc.exampleUsage
          }));

          setSlangTerms(mapped);
        } catch (err) {
          console.error("Error fetching slang terms:", err);
        }
      };

      getSlang();
    }, []);

  useEffect(() => {
    const getFaculty = async () => {
      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_SUSPECT_TABLE
        );

        const mapped: FacultyMember[] = res.documents.map((doc: any) => ({
          $id: doc.$id,
          firstName: doc.firstName,
          lastName: doc.lastName,
          title: doc.title,
          avatarURL: doc.avatarURL
        }));

        setFaculty(mapped);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      }
    };

    getFaculty();
  }, []);

  return (
    <>
      <div>Welcome to the report page!</div>
      <div>How would you like to Report?</div>

      {/* <SlangSelect /> */}
      {/* <PersonSelect /> */}

      <div style={{ marginTop: "2rem" }}>
        {faculty.map((person) => (
          <FacultyCard key={person.$id} person={person} />
        ))}
      </div>

      <Link
        to={`/${params.group}`}
        style={{ display: "block", marginTop: "20px", color: "blue" }}
      >
        Back
      </Link>
    </>
  );
}