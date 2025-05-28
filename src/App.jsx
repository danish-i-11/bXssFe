import { Feedback } from './comp/FeedbackForm';
import { AdminView } from './comp/AdminView';
import { Login } from './comp/Login';
import { Signup } from './comp/Signup';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };
  return (
    <button onClick={handleLogout} className="fixed top-4 left-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Logout</button>
  );
}

function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return children;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Hide logout button if not logged in or on login/signup page
  const hideLogout = !isLoggedIn || ["/login", "/signup"].includes(window.location.pathname);

  return (
    <Router>
      {!hideLogout && <Logout />}
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feedback" element={<ProtectedRoute adminOnly={false}><Feedback /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminView /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
