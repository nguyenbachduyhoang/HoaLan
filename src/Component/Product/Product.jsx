import React, { useState, useEffect } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await fetch('https://670a18feaf1a3998baa30962.mockapi.io/HoaLan');
        const data = await response.json();
        setFlowers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flower data:', error);
        setLoading(false);
      }
    };

    fetchFlowers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter flowers based on search term and selected category
  const filteredFlowers = flowers.filter(flower =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || flower.category === selectedCategory)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  // Extract unique categories for the dropdown
  const categories = [...new Set(flowers.map(flower => flower.category))];

  return (
    <div className="product-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
          <option value="">Tất cả các chủng loại</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="product-container">
        {filteredFlowers.map((flower) => (
          <div key={flower.id} className="product-card">
            {flower.isSpecial && <div className="special-tag">SPECIAL</div>}
            <div className="image-container">
              <img
                src={flower.image}
                alt={flower.name}
                className="product-image"
                aria-label={`Ảnh của hoa ${flower.name}`}
              />
            </div>

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
