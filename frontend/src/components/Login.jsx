import { useState } from 'react';
import axios from 'axios';
import { useAuth, AuthProvider } from '../services/AuthContext';

function Login() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {
                userEmail,
                password
            });
            console.log("Login successful, token received:", response.data.token);
            login(response.data.token);  
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <input 
                type="email" 
                value={userEmail} 
                onChange={e => setUserEmail(e.target.value)} 
                placeholder="Email" 
                className="form-control mr-2"
                style={{ maxWidth: '300px' }}
            />
            <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" 
                className="form-control mr-2"
                style={{ maxWidth: '300px' }}
            />
            <button 
                className="btn btn-sm btn-light" 
                type="submit"
            >
                Login
            </button>
        </form>
    );
}

export default Login;
