import React, { useState, useEffect } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

  useEffect(() => {
    // Fetch dữ liệu từ MockAPI
    const fetchFlowers = async () => {
      try {
        const response = await fetch('https://670a18feaf1a3998baa30962.mockapi.io/HoaLan');
        const data = await response.json();
        setFlowers(data); // Cập nhật state với dữ liệu lấy được
        setLoading(false); // Kết thúc loading
      } catch (error) {
        console.error('Error fetching flower data:', error);
        setLoading(false); // Nếu có lỗi, vẫn kết thúc loading
      }
    };

    fetchFlowers();
  }, []);

  // Lọc hoa dựa trên từ khóa tìm kiếm
  const filteredFlowers = flowers.filter(flower =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Nếu đang tải dữ liệu, hiển thị thông báo loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="product-container">
        {filteredFlowers.map((flower) => (
          <div key={flower.id} className="product-card">
            {flower.isSpecial && <div className="special-tag">SPECIAL</div>}
            <img
              src={flower.image}
              alt={flower.name}
              className="product-image"
              aria-label={`Ảnh của hoa ${flower.name}`}
            />
            <h3 className="product-name">{flower.name}</h3>
            <p className="product-genus">Chủng loại: {flower.category}</p>
            <div className="product-rating">
              {'⭐'.repeat(flower.rating)}
            </div>
            <div className="product-color">
              Màu sắc: <span className="color-dot" style={{ backgroundColor: flower.color }}></span>
            </div>
            <p className="product-origin">Xuất xứ: {flower.origin}</p>
            <p className="product-price">Giá: {flower.price} VNĐ</p>
            <div className="detail-button-container">
              <Link to={`/detail/${flower.id}`} className="detail-button" aria-label={`Chi tiết về ${flower.name}`}>
                Chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
