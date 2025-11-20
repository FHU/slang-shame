import {Routes, Route, Navigate} from 'react-router';
import GroupPage from './pages/GroupPage';
import ReportPage from './pages/ReportPage';
import LeaderBoardPage from './pages/LeaderBoardPage'; 
import DevRoutes from './routes/DevRoutes';
import NotFound from './pages/NotFound'; 

function App() {
  return (
    <Routes>
      {/*Route path="/" redirects to "/group-default" */}
      <Route path="/" element={<Navigate to="/FHU" replace />} />

      {/* Dev Pages */}
      <Route path="/dev/*" element={<DevRoutes />} />

      {/* Normal User Front End */}
      <Route path='/:group' element={<GroupPage />} />
      <Route path="/:group/leaderboard" element={<LeaderBoardPage />} />
      <Route path='/:group/report/:id' element={<ReportPage />} />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  )
}

export default App
