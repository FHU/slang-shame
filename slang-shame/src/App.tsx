//import { useState } from 'react'
import {Routes, Route} from 'react-router';
import GroupPage from './pages/GroupPage';
import ReportPage from './pages/ReportPage';


function App() {
  return (
    <Routes>
      {/*Need to add a default reroute to /FHU*/}
      <Route path='/:group' element={<GroupPage />} />
      <Route path='/:group/report/:id' element={<ReportPage />} />
    </Routes>
  )
}

export default App
