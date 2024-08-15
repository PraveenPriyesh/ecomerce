import React, { useState, useEffect } from 'react';
import './login.css';
import Image from './loginLogo.jpeg';
import { useNavigate } from 'react-router-dom';
import data from './backend/users.json';

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [passwrd, setPasswrd] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    // Function to reset form fields and state
    const resetForm = () => {
        setName('');
        setPasswrd('');
        setLoggedIn(false);
    };
    
    // Function to handle form submission
    const validate = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Find user from the local data
        const user = data.find((item) => name === item.userId && passwrd === item.password);
        if (user) {
            localStorage.setItem('username', name);
            const storedUser = localStorage.getItem('username');
            // Update state and redirect
            setLoggedIn(true);
            alert(`Logged in as ${storedUser}`);
            navigate('/products');
            
        } else {
            alert('Invalid username or password');
            resetForm(); // Reset form fields and state on failed login
        }
        
    };

    // useEffect to reset form on component mount
    useEffect(() => {
        
        resetForm(); // Reset form fields when the component mounts
    }, []); // Empty dependency array ensures this runs only on mount

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <img src={Image} alt="Sample" className="login-image" />
                </div>
                <div className="login-right">
                    <h2>Login</h2>
                    <form className='fields' onSubmit={validate}>
                        <div className="input-container">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="username"
                                name="username"
                                value={name}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPasswrd(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                value={passwrd}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
