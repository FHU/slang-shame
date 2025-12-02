import { useEffect, useState } from "react";
import SlangSelect from '../components/SlangSelect'
import ReportButton from '../components/ReportButton'
import { Link, useParams } from 'react-router';
import PersonSelect from '../components/PersonSelect';
import { databases } from "../appwrite";
import { Query } from "appwrite";

interface FacultyMember {
  $id: string;
  firstName: string;
  lastName: string;
  title: string;
  avatarURL: string;
}

function FacultyCard({ person }: { person: FacultyMember }) {
  const { firstName, lastName, title, avatarURL } = person;

  const handleReport = () => {
    console.log(`Reported ${firstName} ${lastName} for slang crimes.`);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#fafafa"
      }}
    >
      <img
        src={avatarURL}
        alt={`${firstName} ${lastName}`}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "50%"
        }}
      />

      <div style={{ flexGrow: 1 }}>
        <h2 style={{ margin: 0 }}>
          {firstName} {lastName}
        </h2>
        <p style={{ margin: 0, color: "#555" }}>{title}</p>
      </div>

      <button
        onClick={handleReport}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          background: "#d62828",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Report
      </button>
    </div>
  );
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

      <SlangSelect slang={slangTerms} />
      <PersonSelect />

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

const PersonSelect = () => {
  return (
    <div>PersonSelect</div>
  )
}

export default PersonSelect