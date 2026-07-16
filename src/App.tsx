import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeacherDashboard from './pages/TeacherDashboard';
import { TeacherSessionProvider } from './context/TeacherSessionContext';

import StudentDashboard from './pages/StudentDashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <TeacherSessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </BrowserRouter>
    </TeacherSessionProvider>
  );
}

export default App;
