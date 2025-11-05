import {Routes, Route, Navigate} from 'react-router';
import GroupPage from './pages/GroupPage';
import ReportPage from './pages/ReportPage';


function App() {
  return (
    <Routes>
      {/*Route path="/" redirects to "/group-default" */}
      <Route path="/" element={<Navigate to="/FHU" replace />} />
      <Route path='/:group' element={<GroupPage />} />
      <Route path='/:group/report/:id' element={<ReportPage />} />
    </Routes>
  )
}

export default App
