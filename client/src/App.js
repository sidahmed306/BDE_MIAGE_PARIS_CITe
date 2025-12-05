import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Scores from './pages/Scores';
import Challenges from './pages/Challenges';
import Gamification from './pages/Gamification';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light-gray">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Layout>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/teams"
            element={
              <Layout>
                <ProtectedRoute>
                  <Teams />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/scores"
            element={
              <Layout>
                <ProtectedRoute>
                  <Scores />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/challenges"
            element={
              <Layout>
                <ProtectedRoute>
                  <Challenges />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/gamification"
            element={
              <Layout>
                <ProtectedRoute>
                  <Gamification />
                </ProtectedRoute>
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
