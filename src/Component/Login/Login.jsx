import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login({ onLogin, onLogout }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    const handleLoginSuccess = (response) => {
        const decodedCredentials = jwtDecode(response.credential);
        setProfile(decodedCredentials);
        localStorage.setItem('profile', JSON.stringify(decodedCredentials));
        onLogin(); // Gọi hàm onLogin từ App
    };

    const handleLoginFailure = (error) => {
        console.log('Login failed:', error);
    };

    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.removeItem('profile');
        onLogout(); // Gọi hàm onLogout từ App
    };

    return (
        <div>
            <h2>Login</h2>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                >
                    Sign in with Google 🚀
                </GoogleLogin>
            )}
        </div>
    );
}

export default Login;
