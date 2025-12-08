import {Routes, Route, Navigate} from 'react-router';
import TestPage from '../pages/devpages/TestPage';
import TestSlangSearch from '../pages/devpages/TestSlangSearch';
import TestSuspectSearch from '../pages/devpages/TestSuspectSearch';
import DevGroupEdit from '.././pages/devpages/DevGroupEdit';
import DevSuspectEdit from '.././pages/devpages/DevSuspectEdit';
import DevSlangEdit from '.././pages/devpages/DevSlangEdit';
import DevReports from '.././pages/devpages/DevReports';

function DevRoutes() {

    return (
    <Routes>
      <Route path="/" element={<Navigate to="/dev/test" replace />} />
      <Route path='test' element={<TestPage />} />
      <Route path='search/slang' element={<TestSlangSearch />}/>
      <Route path='search/suspects' element={<TestSuspectSearch />}/>
      <Route path='api/group' element={<DevGroupEdit />} />
      <Route path='api/person' element={<DevSuspectEdit />} />
      <Route path='api/slang' element={<DevSlangEdit />} />
      <Route path='reports' element={<DevReports />} />
    </Routes>
    )
}

export default DevRoutes