//import { useState } from 'react'
import {Routes, Route} from 'react-router';
import GroupPage from '../pages/GroupPage';
import ReportPage from '../pages/ReportPage';


function App() {
  return (
    <Routes>
      <Route path='/:group' element={<GroupPage />} />
      <Route path='/:group/report/:id' element={<ReportPage />} />
    </Routes>
  )
}

export default App
