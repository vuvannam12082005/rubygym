import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import TrainerDashboard from './components/Dashboard/TrainerDashboard';
import MemberDashboard from './components/Dashboard/MemberDashboard';
import EventDetail from './components/Events/EventDetail';
import EventList from './components/Events/EventList';
import EvaluationForm from './components/Evaluations/EvaluationForm';
import EvaluationList from './components/Evaluations/EvaluationList';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import MemberDetail from './components/Members/MemberDetail';
import MemberList from './components/Members/MemberList';
import CreateSession from './components/Schedule/CreateSession';
import ScheduleView from './components/Schedule/ScheduleView';
import PlanSelector from './components/Subscriptions/PlanSelector';
import SubscriptionStatus from './components/Subscriptions/SubscriptionStatus';
import TrainerDetail from './components/Trainers/TrainerDetail';
import TrainerList from './components/Trainers/TrainerList';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function HomeRoute() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/events" replace />;
  }

  if (user?.role === 'ADMIN') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (user?.role === 'TRAINER') {
    return <Navigate to="/dashboard/trainer" replace />;
  }

  return <Navigate to="/dashboard/member" replace />;
}

function NotFoundPage() {
  return (
    <section className="page-card">
      <h1>Khong tim thay trang</h1>
      <p>Hay quay lai menu de tiep tuc thao tac.</p>
    </section>
  );
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      {isAuthenticated ? <Sidebar /> : null}
      <div className="content-shell">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetail />} />

            <Route
              path="/dashboard/admin"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/dashboard/trainer"
              element={(
                <ProtectedRoute allowedRoles={['TRAINER']}>
                  <TrainerDashboard />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/dashboard/member"
              element={(
                <ProtectedRoute allowedRoles={['MEMBER']}>
                  <MemberDashboard />
                </ProtectedRoute>
              )}
            />

            <Route
              path="/trainers"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER', 'MEMBER']}>
                  <TrainerList />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/trainers/:id"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER', 'MEMBER']}>
                  <TrainerDetail />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/members"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER']}>
                  <MemberList />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/members/:id"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER', 'MEMBER']}>
                  <MemberDetail />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/schedule/trainer/:trainerId"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER']}>
                  <ScheduleView mode="trainer" />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/schedule/member/:memberId"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER', 'MEMBER']}>
                  <ScheduleView mode="member" />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/schedule/create"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER']}>
                  <CreateSession />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/evaluations"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER', 'MEMBER']}>
                  <EvaluationList />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/evaluations/new"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER']}>
                  <EvaluationForm />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/subscriptions"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'TRAINER', 'MEMBER']}>
                  <SubscriptionStatus />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/subscriptions/new"
              element={(
                <ProtectedRoute allowedRoles={['ADMIN', 'MEMBER']}>
                  <PlanSelector />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
