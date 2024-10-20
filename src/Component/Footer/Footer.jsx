import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Button } from 'antd';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo-text">Orchid Shop</h2>
          <p>
            Chuyên cung cấp các loại hoa lan đẹp và chất lượng cao, mang đến vẻ đẹp tinh tế cho không gian sống của bạn.
          </p>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; 123-456-789</span>
            <span><i className="fas fa-envelope"></i> &nbsp; info@orchidshop.com</span>
          </div>
        
        </div>

        <div className="footer-section links">
          <h2>Liên kết nhanh</h2>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/about">Về chúng tôi</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
            
          </ul>
        </div>

        <div className="footer-section contact-form">
          <h2>Liên hệ với chúng tôi</h2>
          <form>
            <input type="email" name="email" className="text-input contact-input" placeholder="Địa chỉ email của bạn..." />
            <textarea name="message" className="text-input contact-input" placeholder="Tin nhắn của bạn..."></textarea>
            <Button type="primary" danger>
              Gửi
            </Button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2023 OrchidShop.com | Thiết kế bởi Orchid Team
      </div>
    </footer>
  );
}

export default Footer;

