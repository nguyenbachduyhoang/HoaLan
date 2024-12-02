import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './Login.css';

function Login({ onLogin, onLogout }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    const handleLoginSuccess = async (response) => {
        const decodedCredentials = jwtDecode(response.credential);
        setProfile(decodedCredentials);
        localStorage.setItem('profile', JSON.stringify(decodedCredentials));

        try {
            const res = await fetch('https://670a18feaf1a3998baa30962.mockapi.io/Account');
            if (!res.ok) {
                throw new Error('Failed to fetch accounts');
            }
            
            const accounts = await res.json();
            const matchingAccount = accounts.find(account => account.email === decodedCredentials.email);
            
            if (matchingAccount) {
                sessionStorage.setItem('user', JSON.stringify(matchingAccount));
                
                if (matchingAccount.role === 'admin') {
                    console.log("Admin user logged in");
                    window.location.href = '/dashboard';
                } else {
                    console.log("Regular user logged in");
                }
                
                onLogin(matchingAccount.role);
            } else {
                const newUser = {
                    email: decodedCredentials.email,
                    name: decodedCredentials.name,
                    picture: decodedCredentials.picture,
                    role: 'user'
                };
                sessionStorage.setItem('user', JSON.stringify(newUser));
                onLogin('user');
                console.log("New user logged in:", newUser);
            }
            
            window.history.back();
            
        } catch (error) {
            console.error("Error fetching accounts:", error);
            const newUser = {
                email: decodedCredentials.email,
                name: decodedCredentials.name,
                picture: decodedCredentials.picture,
                role: 'user'
            };
            sessionStorage.setItem('user', JSON.stringify(newUser));
            onLogin('user');
            window.history.back();
        }
    };

    const handleLoginFailure = (error) => {
        console.log('Login failed:', error);
    };

    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.removeItem('profile');
        sessionStorage.removeItem('user');
        onLogout();
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {profile ? (
                <div className="user-profile">
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                    />
                </div>
            )}
        </div>
    );
}

export default Login;