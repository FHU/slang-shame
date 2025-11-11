//import React from 'react'
import SlangSelect from '../components/SlangSelect'
import ReportButton from '../components/ReportButton'
import { Link, useParams } from 'react-router-dom';

import PersonSelect from '../components/PersonSelect';

const ReportPage = () => {
    const params = useParams()

  return (
    <>
    <div> Welcome to the report page!</div>
    <div> How would you like to Report?</div>
    <SlangSelect />
    <PersonSelect />
    <Link to={`/${params.group}`} style={{ display: 'block', marginTop: '20px', color: 'blue' }}>
    Back
    </Link>
    </>
  )
}

export default ReportPage