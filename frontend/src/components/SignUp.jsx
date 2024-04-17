import axios from 'axios';
import { useState } from 'react';

function SignUp() {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userEmail || !password) {
            setError('Email and password are required');
            return;
        }
        try {
            console.log("TRYING", userEmail)
            const { data } = await axios.post('/auth/signup', { userEmail: userEmail, password });
            console.log(data)
            localStorage.setItem('token', data.token);
            setError('');
        } catch (error) {
            console.error('Signup failed:', error);
            setError(error.response.data.message || 'Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <input 
                type="email" 
                value={userEmail} 
                onChange={e => setEmail(e.target.value)} 
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
                Sign Up
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}  
        </form>
    );
}

export default SignUp;
