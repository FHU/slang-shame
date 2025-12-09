/// This is the button that is used to go to the report page for the specific person on the group page ///
import { useNavigate, useParams } from 'react-router';

type ReportButtonProps = { reportId: string, firstName: string, lastName?: string | null }

const ReportButton = ({ reportId, firstName, lastName }: ReportButtonProps) => {
    const navigate = useNavigate()
    const { group } = useParams()
    const fullName = (lastName != null ) ? `${firstName} ${lastName}`: firstName
    const handleClick = () => { if (group) { navigate(`/${group}/report/${reportId}`) } }
    return (
        <button
            className="w-full text-2xl font-bold text-[var(--color-secondary-foreground)] dark:text-[var(--color-accent-foreground)] text-center py-3 px-4 rounded-lg hover:opacity-90 transition-opacity bg-transparent border-2 border-[var(--color-secondary-foreground)] dark:border-[var(--color-accent-foreground)]"
            onClick={handleClick}>
            Report {`${fullName}`}
        </button>
    )
}
export default ReportButton
