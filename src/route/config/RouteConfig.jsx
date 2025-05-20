// src/route/config/RouteConfig.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login            from '../../component/loginpage/Login';
import Registration     from '../../component/Registration/Registration';
import Dashboard        from '../../component/DashBoard/Dashboard';
import TicketDetail from '../../component/TicketDetail/TicketDetail';
import OAuth2Success from '../../component/OAuth2Success';
import PurchaseTicket from '../../component/PurchaseTicket/PurchaseTicket';
import Payment from '../../component/Payment/Payment';
import PurchaseSuccess from '../../component/PurchaseTicket/PurchaseSuccess';
//import AvailableLines   from '../../component/AvailableLines/AvailableLines';
//import PurchaseTicket   from '../../component/PurchaseTicket/PurchaseTicket';
import History from '../../component/History/History';
import Setting         from '../../component/Setting/Setting';
//import NotFound         from '../../component/NotFound/NotFound';

const RouteConfig = () => (
  <Routes>
    {}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Public */}
    <Route path="/login"  element={<Login />} />
    <Route path="/signup" element={<Registration />} />
    <Route path="/oauth2-success" element={<OAuth2Success />} />

    {/*Dashboard page*/}
    <Route path="/dashboard" element={<Dashboard />} />
    {/*Ticket detail page*/}
    <Route path="/tickets/:id" element={<TicketDetail />} />
    {/*Ticket detail page*/}
    <Route path="/purchase" element={<PurchaseTicket />} />
    {/*Payment page */}
    <Route path="/payment" element={<Payment />} />
    {/*Confirmation page */}
    <Route path="/confirmation"     element={<PurchaseSuccess />} />
    {/*<Route path="/lines"     element={<AvailableLines />} />
    <Route path="/purchase"  element={<PurchaseTicket />} />
    <Route path="/settings"  element={<Settings />} />*/}
    <Route path="/history"   element={<History />} />
    <Route path="/settings"  element={<Setting />} />

    {/*<Route path="*" element={<NotFound />} />*/}
    
  </Routes>
);

export default RouteConfig;
