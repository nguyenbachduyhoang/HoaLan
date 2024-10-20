import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google'; //lấy api đăng nhập từ google
import { jwtDecode } from "jwt-decode";

function Login() {
    const [profile, setProfile] = useState(); // Thêm state để lưu trữ thông tin người dùng
    const handleLoginSuccess = async response => {
        console.log('Login success:', response);
        var decodedCredentials = jwtDecode(response.credential)
        console.log(decodedCredentials)
        setProfile(decodedCredentials)
        // Lấy thông tin người dùng từ Google

    };


    const handleLoginFailure = (error) => {
        console.log('Login failed:', error);
    };

    const logOut = () => {
        googleLogout(); // Đăng xuất người dùng
        setProfile(null); // Đặt lại state profile
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