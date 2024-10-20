import React, { useState } from 'react';
import './Special.css';
import dataFlower from '../../data/DataFlower';
import { Link } from 'react-router-dom';

const Special = () => {
  // State để quản lý từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc ra các sản phẩm đặc biệt
  const specialProducts = dataFlower.filter(flower => flower.isSpecial && flower.name.toLowerCase().includes(searchTerm.toLowerCase()));

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

      <div className="special-product-list">
        {specialProducts.map((flower) => (
          <div key={flower.id} className="special-product-card">

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
    </div>
  );
};

export default Special;
