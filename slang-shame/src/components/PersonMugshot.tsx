import ReportButton from './SelectPersonToReportButton';

type PersonMugshotProps = {
  suspectId: string;
  firstName: string;
  lastName?: string | null;
  avatarURL?: string | null;
}

const PersonMugshot = ({ suspectId, firstName, lastName, avatarURL }: PersonMugshotProps) => {
  return (
    <article className='border-4 border-[var(--color-secondary)] rounded-lg overflow-hidden shadow-lg bg-white dark:bg-[var(--color-black)] transition-colors'>
      {avatarURL && (
        <img
          src={avatarURL}
          alt={`${firstName} ${lastName || ''}`}
          className="w-full h-auto object-cover"
        />
      )}
      <div className="p-4 bg-[var(--color-secondary)] dark:bg-[var(--color-accent)]">
        <ReportButton reportId={suspectId} firstName={firstName} lastName={lastName} />
      </div>
    </article>
  )
}

export default PersonMugshot