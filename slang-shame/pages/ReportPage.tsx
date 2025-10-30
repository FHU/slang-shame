//import React from 'react'
import SlangSelect from '../components/SlangSelect'
import ReportButton from '../components/ReportButton'

import { useParams } from 'react-router';

const ReportPage = () => {
    const params = useParams()

  return (
    <>
    <div>You are reporting {params.id}</div>
    <SlangSelect />
    <ReportButton />
    </>
  )
}

export default ReportPage