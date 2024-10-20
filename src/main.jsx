import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.jsx';
// import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Thêm import này, clientId là code api đăng nhập

ReactDOM.createRoot(document.getElementById('root')).render( 
  <GoogleOAuthProvider clientId="251789286524-b60an6oissom7rkcggalf3c5fkfl3ev1.apps.googleusercontent.com"> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
