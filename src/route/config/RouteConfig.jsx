// src/route/config/RouteConfig.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login            from '../../component/loginpage/Login';
import Registration     from '../../component/Registration/Registration';
import Dashboard        from '../../component/DashBoard/Dashboard';
import TicketDetail from '../../component/TicketDetail/TicketDetail';
//import AvailableLines   from '../../component/AvailableLines/AvailableLines';
//import PurchaseTicket   from '../../component/PurchaseTicket/PurchaseTicket';
//import History          from '../../component/History/History';
//import Settings         from '../../component/Settings/Settings';
//import NotFound         from '../../component/NotFound/NotFound';

const RouteConfig = () => (
  <Routes>
    {}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Public */}
    <Route path="/login"  element={<Login />} />
    <Route path="/signup" element={<Registration />} />

    {/*Dashboard page*/}
    <Route path="/dashboard" element={<Dashboard />} />
    {/*Ticket detail page*/}
    <Route path="/tickets/:id" element={<TicketDetail />} />
    {/*<Route path="/lines"     element={<AvailableLines />} />
    <Route path="/purchase"  element={<PurchaseTicket />} />
    <Route path="/history"   element={<History />} />
    <Route path="/settings"  element={<Settings />} />*/}

    {/*<Route path="*" element={<NotFound />} />*/}
    
  </Routes>
);

export default RouteConfig;
