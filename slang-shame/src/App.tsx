import {Routes, Route, Navigate} from 'react-router-dom';
import GroupPage from './pages/GroupPage';
import ReportPage from './pages/ReportPage';
import LeaderBoardPage from './pages/LeaderBoardPage'; 

function App() {
  return (
    <Routes>
      {/*Route path="/" redirects to "/group-default" */}
      <Route path="/" element={<Navigate to="/FHU" replace />} />
      <Route path='/:group' element={<GroupPage />} />
      <Route path='/:group/Report/123' element={<ReportPage />} />
      <Route path="/:group/leaderboard" element={<LeaderBoardPage />} /> {/* ✅ New route */}
    </Routes>
  )
}

export default App
