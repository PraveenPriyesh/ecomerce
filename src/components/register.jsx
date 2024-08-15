import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import data from './backend/users.json';

const Register = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [userId, setUserId] = useState('');

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmChange = (e) => setConfirm(e.target.value);

    const save = async (e) => {
        e.preventDefault();
        
        // Check if the password length is less than 6
        if (password.length < 6) {
            alert('Your password should be more than 6 characters');
            return;
        }

        // Check if the password and confirm password match
        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }

        // Check if the userId already exists
        const existingUser = data.find(user => user.userId === userId);
        if (existingUser) {
            alert('User with this ID is already registered');
            navigate('/');
        }

        const payload = { userId, password };
        try {
            const res = await axios.post('http://localhost:5000/api/update-user', payload);
            if(!existingUser){
                alert('Saved successfully');
            }
           
            navigate('/', { state: { data: res.data } });
        } catch (err) {
            console.error('Error details:', err.response ? err.response.data : err.message);
            alert('Error saving user');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={save}>
                    <div className="input-container">
                        <label htmlFor="username">Username (not Email Id, just your name )</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirm}
                            onChange={handleConfirmChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
