import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './LoginButton.css';

export default function LoginButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();  // Check on mount

        // Also react to changes in localStorage across tabs
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []); // Run on component mount and when storage event is fired

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return isLoggedIn ? (
        <button className="btn btn-lg btn-light" onClick={handleLogout}>
            Logout
        </button>
    ) : (
        <NavLink to="/login" className="btn btn-lg btn-light">
            Login
        </NavLink>
    );
}
