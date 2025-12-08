/// This is the button that is used to go to the report page for the specific person on the group page ///
import { useNavigate, useParams } from 'react-router';

type ReportButtonProps = { reportId: string, firstName: string, lastName?: string | null } 

const ReportButton = ({ reportId, firstName, lastName }: ReportButtonProps) => { 
    const navigate = useNavigate() 
    const { group } = useParams()
    const fullName = (lastName != null ) ? `${firstName} ${lastName}`: firstName
    const handleClick = () => { if (group) { navigate(`/${group}/report/${reportId}`) } } 
    return ( <button 
        className="text-4xl font-bold text-blue-600 text-center no-underline"
        onClick={handleClick}>
            Report {`${fullName}`}
        </button> ) } 
export default ReportButton
