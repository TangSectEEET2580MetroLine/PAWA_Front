import React, {createContext} from 'react'
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(false)
const token = jwtDecode(localStorage.getItem('token'));
export default {AuthContext,token};