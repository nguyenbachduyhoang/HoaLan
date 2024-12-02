import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn }) => {
  const userInfo = JSON.parse(sessionStorage.getItem('user'));
  const isAdmin = userInfo?.role === 'admin';

  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-title-wrapper">
          <h1 className="logo-text">Orchid Shop</h1>
          <img src="/logo.png" alt="logo" className="logo-image" />
        </div>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">TRANG CHỦ</Link></li>
          {isLoggedIn && isAdmin && (
            <li><Link to="/dashboard">DASHBOARD</Link></li>
          )}
          <li><Link to="/products">SẢN PHẨM</Link></li>
          <li><Link to="/special-products">SẢN PHẨM ĐẶC BIỆT</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
          <li><Link to="/contact">LIÊN HỆ</Link></li>
          <li><Link to="/login">TÀI KHOẢN</Link></li>

          {isLoggedIn && (
            <li>
              <Link to="/cart">GIỎ HÀNG</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
