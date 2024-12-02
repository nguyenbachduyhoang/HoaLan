import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [specialProducts, setSpecialProducts] = useState([]);

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://670a18feaf1a3998baa30962.mockapi.io/HoaLan');
        const data = await response.json();
        // Lọc 3 sản phẩm đặc biệt
        const special = data.filter((flower) => flower.isSpecial).slice(0, 3);
        setSpecialProducts(special);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1 className="main-title">Giới Thiệu Hoa Lan</h1>

      <div className="intro-section">
        <p>
          Hoa lan (Orchidaceae) là một trong những loài hoa đẹp và quý hiếm nhất trong thế giới thực vật. Chúng không chỉ có vẻ đẹp rực rỡ mà còn
          mang nhiều ý nghĩa văn hóa và biểu tượng trong nhiều nền văn hóa khác nhau. Dưới đây là một bài viết giới thiệu về loài hoa lan, vẻ đẹp cũng như cách chăm sóc.
        </p>
        <img src="/orchid-intro.jpg" alt="Hoa lan đẹp" className="intro-image" />
      </div>

      <div className="beauty-section">
        <h2>Vẻ đẹp của hoa lan</h2>
        <div className="beauty-content">
          <p>
            Mỗi loài hoa lan có hình dáng, màu sắc và hương thơm riêng biệt, mang đến một sức hấp dẫn đặc biệt. Hoa lan thường có cánh hoa mềm mại, nhiều màu sắc, từ trắng,
            tím, vàng đến xanh lục. Ngoài ra, một số loài còn có hương thơm dịu nhẹ, như lan Dendrobium, lan Vanda.
          </p>
          <div className="beauty-images">
            <img src="/orchid-purple.jpg" alt="Hoa lan tím" />
          </div>
        </div>
      </div>

      <div className="meaning-section">
        <h2>Ý nghĩa của hoa lan</h2>
        <ul>
          <li>
            <strong>Trong phong thủy:</strong> Hoa lan mang lại may mắn, tài lộc và sự thịnh vượng cho gia đình. Người ta tin rằng đặt hoa lan trong nhà sẽ giúp tạo nên không gian hài hòa và cân bằng năng lượng.
          </li>
          <li>
            <strong>Trong tình yêu:</strong> Hoa lan là món quà tuyệt vời để thể hiện tình yêu chân thành và sâu đậm. Những bông hoa lan trắng tượng trưng cho tình yêu thuần khiết, trong khi hoa lan tím lại là biểu tượng của sự thủy chung và cao quý.
          </li>
          <li>
            <strong>Trong văn hóa:</strong> Ở nhiều quốc gia, hoa lan là biểu tượng của sự hoàn mỹ và tinh tế, được dùng để trang trí trong các dịp lễ trọng đại hay sự kiện quan trọng.
          </li>
        </ul>
        <img src="/orchid-meaning.jpg" alt="Ý nghĩa hoa lan" className="meaning-image" />
      </div>

      {/* Thêm phần sản phẩm đặc biệt */}
      <div className="special-products-section">
        <h2>Sản phẩm đặc biệt</h2>
        <div className="special-product-list">
          {specialProducts.map((flower) => (
            <div key={flower.id} className="special-product-card">
              <div className="special-tag">SPECIAL</div>
              <img src={`${flower.image}`} alt={flower.name} className="special-product-image" />
              <h3 className="special-product-name">{flower.name}</h3>
              <p className="special-product-genus">Chủng loại: {flower.category}</p>
              <div className="special-product-rating">
                <div className="product-rating">
                  {'⭐'.repeat(flower.rating)}
                </div>
              </div>
              <div className="special-product-color">
                Màu sắc: <span className="color-dot" style={{ backgroundColor: flower.color }}></span>
              </div>
              <p className="special-product-origin">Xuất xứ: {flower.origin}</p>
              <p className="special-product-price">Giá: {flower.price} VNĐ</p>
              <Link to={`/detail/${flower.id}`} className="detail-link">Chi tiết</Link>
            </div>
          ))}
        </div>
        <Link to="/special-products" className="view-all-special">Xem tất cả sản phẩm đặc biệt</Link>
      </div>
    </div>
  );
};

export default Home;
