import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
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

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;
  if (!flower) return <div>Không tìm thấy sản phẩm</div>;

  const imgURL = flower.image.replace("/detail", "");

  return (
    <div className="detail-container">
      <div className="detail-image">
        <img src={imgURL} alt={flower.name} className="product-image" />
      </div>
      <div className="detail-info">
        <h2>{flower.name}</h2>
        <p><strong>Chủng loại:</strong> {flower.category}</p>
        <p><strong>Xuất xứ:</strong> {flower.origin}</p>
        <p><strong>Màu sắc:</strong> <span className="color-dot" style={{ backgroundColor: flower.color }}></span></p>
        <p><strong>Giá:</strong> {flower.price} VNĐ</p>
        <p> <strong>Đánh giá:</strong>
          {'⭐'.repeat(flower.rating)}
        </p>


        <p><strong>Mô tả:</strong> {flower.description}</p>
      </div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/VVQ0p-9PdWM?si=D4yL24H46MHRTA96" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  );
};

export default Detail;
