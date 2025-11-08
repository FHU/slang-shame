import {Routes, Route, Navigate} from 'react-router';
import GroupPage from './pages/GroupPage';
import ReportPage from './pages/ReportPage';
import TestPage from './pages/TestPage'


function App() {
  return (
    <Routes>
      {/*Route path="/" redirects to "/group-default" */}
      <Route path="/" element={<Navigate to="/FHU" replace />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='/:group' element={<GroupPage />} />
      <Route path='/:group/report/:id' element={<ReportPage />} />
      
    </Routes>
  )
}

export default App
