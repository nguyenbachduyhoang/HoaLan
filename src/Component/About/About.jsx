import React from 'react';
import './about.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">Chào mừng đến với Orchid Shop
        </h1>
        <p className="about-description">
          Tại <strong>Hoa Lan Shop</strong>, chúng tôi tự hào là cửa hàng chuyên cung cấp các loại hoa lan chất lượng cao, đa dạng về chủng loại và màu sắc. 
          Mỗi bông hoa lan là biểu tượng của sự tinh tế và sang trọng, phù hợp cho mọi không gian.
        </p>
        <p className="about-description">
          Với niềm đam mê và sự tận tâm, chúng tôi mang đến cho khách hàng những bông hoa lan đẹp nhất, được chăm sóc kỹ lưỡng. 
          Dù bạn đang tìm kiếm một món quà ý nghĩa hay chỉ để trang trí, chúng tôi luôn sẵn sàng hỗ trợ bạn.
        </p>
        <p className="about-highlight">
          Địa chỉ: KTX Khu B Làng Đại Học - Liên hệ: 0387790898
        </p>
        <a 
          className="about-map-link" 
          href="https://maps.app.goo.gl/crkJT13mGy1JSdXRA" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Xem bản đồ
        </a>
      </div>
    </section>
  );
};

export default About;
