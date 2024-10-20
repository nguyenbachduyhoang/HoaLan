import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="contact-title">Liên Hệ Với Orchid Shop
        </h1>
        <p className="contact-description">
          Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua các kênh dưới đây hoặc điền thông tin vào form liên hệ. Chúng tôi sẽ phản hồi bạn sớm nhất có thể.
        </p>
        <div className="contact-info">
          <p><strong>Địa chỉ:</strong> KTX Khu B Làng Đại Học</p>
          <p><strong>Điện thoại:</strong> 0387790898</p>
          <p><strong>Email:</strong> hoalanshop@example.com</p>
        </div>
        
        <form className="contact-form">
          <input type="text" placeholder="Tên của bạn" required />
          <input type="email" placeholder="Email của bạn" required />
          <textarea placeholder="Lời nhắn của bạn" required></textarea>
          <button type="submit" className="contact-button">Gửi liên hệ</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
