import React, { useState, useEffect } from 'react';
import './Special.css';
import { Link } from 'react-router-dom';

const Special = () => {
  // State để quản lý từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

  useEffect(() => {
    // Fetch dữ liệu từ MockAPI
    const fetchFlowers = async () => {
      try {
        const response = await fetch('https://670a18feaf1a3998baa30962.mockapi.io/HoaLan');
        const data = await response.json();
        setFlowers(data); // Cập nhật state với dữ liệu từ API
        setLoading(false); // Kết thúc trạng thái loading
      } catch (error) {
        console.error('Error fetching flower data:', error);
        setLoading(false); // Nếu có lỗi, vẫn kết thúc trạng thái loading
      }
    };

    fetchFlowers();
  }, []);

  // Lọc ra các sản phẩm đặc biệt dựa trên từ khóa tìm kiếm
  const specialProducts = flowers.filter(flower => flower.isSpecial && flower.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Nếu đang tải dữ liệu, hiển thị thông báo loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="special-container">
      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Danh sách sản phẩm đặc biệt */}
      <div className="special-product-list">
        {specialProducts.map((flower) => (
          <div key={flower.id} className="special-product-card">
            <img src={flower.image} alt={flower.name} className="special-product-image" />
            <h3 className="special-product-name">{flower.name}</h3>
            <p className="special-product-genus">Chủng loại: {flower.category}</p>
            <div className="special-product-rating">
              {'⭐'.repeat(flower.rating)}
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
    </div>
  );
};

export default Special;
