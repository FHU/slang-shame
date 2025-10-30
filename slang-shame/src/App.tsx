//import { useState } from 'react'
import {Routes, Route} from 'react-router';
import GroupPage from '../components/GroupPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<GroupPage />} />
    </Routes>
  )
}

export default App
