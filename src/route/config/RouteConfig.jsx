import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../../component/loginpage/Login';
//import PassengerForm from '../../component/loginpage/PassengerForm';
//import LoginPortal from '../../component/loginpage/LoginPortal';

const RouteConfig = () => (
  <Routes>
    <Route path="/login" element={
      <Login/>
    } />
  </Routes>
);

export default RouteConfig;