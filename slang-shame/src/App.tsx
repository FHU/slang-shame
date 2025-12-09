import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router';
import GroupPage from './pages/GroupPage';
import ReportPage from './pages/ReportPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import DevRoutes from './routes/DevRoutes';
import NotFound from './pages/NotFound';
import LastReportedPage from './pages/LastReportedPage';

function App() {
  useEffect(() => {
    // Detect system dark mode preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial dark mode
    if (darkModeMediaQuery.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Routes>
      {/*Route path="/" redirects to "/group-default" */}
      <Route path="/" element={<Navigate to="/FHU" replace />} />

      {/* Dev Pages */}
      <Route path="/dev/*" element={<DevRoutes />} />

      {/* Normal User Front End */}
      <Route path='/:group' element={<GroupPage />} />
      <Route path="/:group/leaderboard" element={<LeaderBoardPage />} />
      <Route path="/:group/lastreport" element={<LastReportedPage />} />
      <Route path='/:group/report/:id' element={<ReportPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
