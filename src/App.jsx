import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { UIProvider } from './contexts/UIContext.jsx'
import Login from './views/Login.jsx'
import MainLayout from './components/MainLayout.jsx'
import DashboardView from './views/Dashboard/DashboardView.jsx'
import CoursesView from './views/Courses/CoursesView.jsx'
import LecturersView from './views/Lecturers/LecturersView.jsx'
import FinancialView from './views/Finance/FinancialView.jsx'
import SettingsView from './views/Settings/SettingsView.jsx'
import SubmitWork from './views/Assignments/SubmitWork.jsx'
import ViewResults from './views/Assignments/ViewResults.jsx'

function ProtectedLayout() {
  return localStorage.getItem('loggedIn') ? <MainLayout /> : <Navigate to="/login" replace />
}

export default function App() {
  return <ThemeProvider><UIProvider><Routes>
    <Route path="/" element={<Navigate to={localStorage.getItem('loggedIn') ? '/app/dashboard' : '/login'} replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/app" element={<ProtectedLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardView />} />
      <Route path="students" element={<CoursesView />} />
      <Route path="teachers" element={<LecturersView />} />
      <Route path="finance" element={<FinancialView />} />
      <Route path="settings" element={<SettingsView />} />
      <Route path="submit-work" element={<SubmitWork />} />
      <Route path="view-results" element={<ViewResults />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></UIProvider></ThemeProvider>
}
