import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// AuthContext adjustments
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            updateUser(token);
        } else {
            setUser(null);
        }
    }, []);

    const updateUser = (token) => {
        axios.get('http://localhost:8080/auth/user', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setUser({
                token: token,
                email: response.data.email,
                subscriptionTier: response.data.subscriptionTier
            });
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            setUser(null);
        });
    };

    const login = (token) => {
        localStorage.setItem('token', token);
        updateUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

