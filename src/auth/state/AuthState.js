import React, { createContext } from 'react';
import guestUser from '../instance/GuestInstance';
import passengerInitialState from '../instance/PassengerInstance';

const AuthState = createContext({
    user: guestUser,
    passenger: passengerInitialState,
    token: localStorage.getItem('token') || null
});

export default AuthState;