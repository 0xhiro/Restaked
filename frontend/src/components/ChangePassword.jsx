import axios from 'axios';
import { useState } from 'react';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const { data } = await axios.post('/auth/change-password', { oldPassword, newPassword }, { headers });
            console.log(data);
            setMessage('Password successfully changed');
        } catch (error) {
            setMessage('Failed to change password');
            console.error('Change password failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <input 
                type="password" 
                value={oldPassword} 
                onChange={e => setOldPassword(e.target.value)} 
                placeholder="Old Password" 
                className="form-control mr-2"  
                style={{ maxWidth: '300px' }}  
            />
            <input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                placeholder="New Password" 
                className="form-control mr-2"  
                style={{ maxWidth: '300px' }} 
            />
            <button 
                className="btn btn-sm btn-light"  
                type="submit"
            >
                Change Password
            </button>
            {message && <div style={{ marginTop: '10px', color: 'red' }}>{message}</div>} 
        </form>
    );
}

export default ChangePassword;
