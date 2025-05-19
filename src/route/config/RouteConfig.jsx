import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PassengerForm from '../../component/loginpage/PassengerForm';
import LoginPortal from '../../component/loginpage/LoginPortal';
import Menu from '../../component/menu/menu';
import MyProfile from '../../component/myPofile/myProfile';

const RouteConfig = () => (
  <Routes>
    <Route path="/login" element={
      <LoginPortal />
    } />
    <Route path="/passengerform" element={
      <ProtectedRoute accessRole={["ROLE_PASSENGER"]}>
        <PassengerForm />
      </ProtectedRoute>
    } />
    <Route path="/menu" element={
      <ProtectedRoute accessRole={["ROLE_PASSENGER", "ROLE_ADMIN"]}>
        <Menu />
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute accessRole={["ROLE_PASSENGER", "ROLE_ADMIN"]}>
        <MyProfile />
      </ProtectedRoute>
    } />
    <Route path="*" element={<div>Not Found</div>} />
  </Routes>
);

export default RouteConfig;