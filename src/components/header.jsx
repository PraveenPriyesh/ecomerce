import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function TextLinkExample() {
    const navigate = useNavigate();

    const regi = () => {
        navigate('/register');
    };

    const logIn = () => {
        navigate('/');
    };
    const user=localStorage.getItem('username');
    const logout=()=>{
        navigate('/');
        localStorage.setItem('username','');
    }
    const qkart=()=>{
        navigate('/');
    }
    return (
        <Navbar bg="primary">
            <Container>
                <Navbar.Brand href="#home" style={{ color: 'white' }}>QKART-FRONTEND</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {/* Display based on the current route */}
                    {window.location.pathname === '/register' ? (
                        <div>
                            <a onClick={logIn} style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
                                Go to Login
                            </a>
                        </div>
                    ) : window.location.pathname === '/products' ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '350px', // Set a fixed width for the container
                            paddingRight: '10px'
                        }}>
                            <h4 style={{ color: 'white', margin: 0 }}>Welcome {user}</h4>
                            <Button onClick={logout} variant="light" style={{ marginLeft: 'auto' }}>Logout</Button>
                        </div>
                    ) : (
                        <Navbar.Text style={{ color: 'white' }}>
                            New User?{' '}
                            <a onClick={regi} style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
                                Register here
                            </a>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TextLinkExample;
