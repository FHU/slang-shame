import {Routes, Route, Navigate} from 'react-router';
import GroupPage from './pages/GroupPage';
import ReportPage from './pages/ReportPage';
import LeaderBoardPage from './pages/LeaderBoardPage'; 
import TestPage from './pages/TestPage';
import TestSlangSearch from './pages/TestSlangSearch';
import TestSuspectSearch from './pages/TestSuspectSearch';
import DevGroupEdit from './pages/DevGroupEdit';
import DevSuspectEdit from './pages/DevSuspectEdit';
import DevSlangEdit from './pages/DevSlangEdit';
import DevReports from './pages/DevReports';


function App() {
  return (
    <Routes>
      {/*Route path="/" redirects to "/group-default" */}
      <Route path="/" element={<Navigate to="/FHU" replace />} />

      {/* Dev Pages */}
      <Route path="/dev" element={<Navigate to="/dev/test" replace />} />
      <Route path='/dev/test' element={<TestPage />} />
      <Route path='/dev/search/slang' element={<TestSlangSearch />}/>
      <Route path='/dev/search/suspects' element={<TestSuspectSearch />}/>
      <Route path='/dev/api/group' element={<DevGroupEdit />} />
      <Route path='/dev/api/person' element={<DevSuspectEdit />} />
      <Route path='/dev/api/slang' element={<DevSlangEdit />} />
      <Route path='/dev/reports' element={<DevReports />} />

      {/* Normal User Front End */}
      <Route path='/:group' element={<GroupPage />} />
      <Route path="/:group/leaderboard" element={<LeaderBoardPage />} />
      <Route path='/:group/report/:id' element={<ReportPage />} />
      
    </Routes>
  )
}

export default App
