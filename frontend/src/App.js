import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Account';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './services/AuthContext';

function App() {
  const links = [
    { path: '/', title: 'Home' },
    { path: '/dashboard', title: 'Dashboard' },
    { path: 'https://restaked-app.gitbook.io/restaked.app-api-documentation', title: 'Documentation' },
  ];

  return (
    <AuthProvider> 
      <Router>
        <div className="App">
          <Navbar links={links} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

function ProtectedRoute({ children }) {
  const { user } = useAuth(); 

  if (!user || !user.token) { 
      alert('Login or signup to view dashboard!');
      return <Navigate to="/" />;
  }

  return children;
}
