import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Detail.css';
import Comment from '../Comment/Comment';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlower = async () => {
      try {
        const response = await fetch(`https://670a18feaf1a3998baa30962.mockapi.io/HoaLan/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFlower(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlower();
  }, [id]);

  const handleAddToCart = () => {
    const isLoggedIn = sessionStorage.getItem('user');
    
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/login');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === flower.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...flower,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`Đã thêm "${flower.name}" vào giỏ hàng!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;
  if (!flower) return <div>Không tìm thấy sản phẩm</div>;

  const imgURL = flower.image.replace("/detail", "");

  return (
    <div className="detail-container">
      {/* Product Section */}
      <div className="product-section">
        <div className="detail-image">
          <img src={imgURL} alt={flower.name} className="product-image" />
        </div>
        <div className="detail-info">
          <h2>{flower.name}</h2>
          <p><strong>Chủng loại:</strong> {flower.category}</p>
          <p><strong>Xuất xứ:</strong> {flower.origin}</p>
          <p><strong>Màu sắc:</strong> <span className="color-dot" style={{ backgroundColor: flower.color }}></span></p>
          <p><strong>Giá:</strong> {flower.price} VNĐ</p>
          <p><strong>Đánh giá:</strong> {'⭐'.repeat(flower.rating)}</p>
          <p><strong>Mô tả:</strong> {flower.description}</p>
          
          {/* Thêm nút Thêm vào giỏ hàng */}
          <button 
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/VVQ0p-9PdWM?si=D4yL24H46MHRTA96" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <Comment />
      </div>
    </div>
  );
};

export default Detail;
