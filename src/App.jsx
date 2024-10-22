import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Product from './Component/Product/Product';
import Special from './Component/Special/Special';
import Detail from './Component/Detail/Detail';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import DashBoard from './Component/HomeNews/DashBoard';
import Login from './Component/Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setIsLoggedIn(true); // Người dùng đã đăng nhập trước đó
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/special-products" element={<Special />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} onLogout={handleLogout} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
