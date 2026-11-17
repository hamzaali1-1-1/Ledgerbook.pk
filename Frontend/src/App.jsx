import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import OwnerDashboard from './components/dashboared/OwnerDashboared';
import CustomerDashboard from './components/dashboared/CustomerDashboared';
import StaffDashboared from './components/dashboared/StaffDashboared';
import Reports from './components/ledger/Reports';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* By default Signup page open hoga */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/staff" element={<StaffDashboared />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/reports" element = {<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;