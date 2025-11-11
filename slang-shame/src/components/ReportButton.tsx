//import React from 'react'

// const ReportButton = () => {
//   return (
//     <div>ReportButton</div>
//   )
// }

// export default ReportButton

import { useNavigate, useParams } from 'react-router-dom' 
type ReportButtonProps = { reportId: string } 
const ReportButton = ({ reportId }: ReportButtonProps) => { const navigate = useNavigate() 
const { group } = useParams() 
const handleClick = () => { if (group) { navigate(`/${group}/report/${reportId}`) } } 
return ( <button onClick={handleClick}>Report</button> ) } 
export default ReportButton
