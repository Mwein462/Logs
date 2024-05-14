import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup({ onAuthenticate }) {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isSignup, setIsSignup] = useState(true);

    async function handleSignup(e) {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/Signup", {
                fullName,
                email,
                password,
                balance: 0
            });

            if (res.data === 'success') {
                const userData = { email, balance: 0 };
                setIsLoggedIn(true);
                setUser(userData);
                onAuthenticate(userData);
                navigate('/Cardorder', { state: { id: email } });
            } else if (res.data === 'exist') {
                alert("User already exists");
            }
        } catch (error) {
            alert('Error signing up');
            console.error(error);
        }
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/Login", {
                email,
                password
            });

            if (res.data.exist) {
                const userData = { email, balance: res.data.balance };
                setIsLoggedIn(true);
                setUser(userData);
                onAuthenticate(userData);
                navigate('/Cardorder', { state: { id: email } });
            } else {
                alert("User does not exist or credentials are incorrect");
            }
        } catch (error) {
            alert('Error logging in');
            console.error(error);
        }
    }

    return (
        <div className="signup">
            <div className="toggle-buttons">
                <button onClick={() => setIsSignup(true)}>Sign Up</button>
                <button onClick={() => setIsSignup(false)}>Login</button>
            </div>
            <div className="form-section">
                {isLoggedIn ? (
                    <h1>Welcome, {user.email}!</h1>
                ) : (
                    <>
                        <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
                        <form onSubmit={isSignup ? handleSignup : handleLogin}>
                            {isSignup && (
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
                            )}
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            {isSignup && (
                                <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat Password" />
                            )}
                            <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
                        </form>
                    </>
                )}
            </div>
            <br />
        </div>
    );
}

export default Signup;
