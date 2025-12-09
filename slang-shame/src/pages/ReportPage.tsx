import { useState } from 'react'
import SlangList from '../components/SlangList'
import { Link, useParams, useNavigate } from 'react-router';
import { sendReport } from '../utils/appwriteFunctions';

const ReportPage = () => {
    const {group:groupName, id:suspectID} = useParams()
    const navigate = useNavigate();
    const [selectedSlangId, setSelectedSlangId] = useState<string | null>(null);

    // This would be the report button
    const makeReport = async () => {
      if (!selectedSlangId) return;
      console.log("Reporting slang usage...");
      const report = await sendReport({
        suspectID: suspectID || "",
        slangID: selectedSlangId,
        reporterID: "dev", // Replace with actual reporter ID
        groupName: groupName || "" // Replace with actual group ID
      });
      // Redirect to group page after a successful report is sent
      if (report && groupName) {
        navigate(`/${groupName}`);
      }
  };
  return (
    <div className="min-h-screen bg-white dark:bg-[var(--color-black)] transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
            Welcome to the report page!
          </h1>
          <h2 className="text-2xl font-semibold text-[var(--color-secondary)] dark:text-[var(--color-secondary-foreground)]">
            Select the Slang the Perpetrator Said
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <SlangList
            selectedId={selectedSlangId}
            onSelect={(id) => setSelectedSlangId(id)}
          />
        </div>

        <div className="flex justify-center mb-8">
          <button
            disabled={!selectedSlangId}
            onClick={makeReport}
            className="text-2xl font-bold px-8 py-4 rounded-lg border-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)] hover:opacity-90"
          >
            Confirm Selection
          </button>
        </div>

        <div className="text-center">
          <Link
            to={`/${groupName}`}
            className="text-xl font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors underline"
          >
            Back to {groupName}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ReportPage