// src/route/config/RouteConfig.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../component/loginpage/Login';
import Registration from '../../component/Registration/Registration';
import Dashboard from '../../component/DashBoard/Dashboard';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// … nếu có thêm các route khác thì import vào

const RouteConfig = () => (
  <Routes>
    {}
    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Registration />} />
    <Route path="/dashboard" element={<Dashboard />} />

    {}
    {/* 
    <Route
      path="/menu"
      element={
        <ProtectedRoute accessRole={['ROLE_PASSENGER', 'ROLE_ADMIN']}>
          <Menu />
        </ProtectedRoute>
      }
    /> 
    */}

    {}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default RouteConfig;
