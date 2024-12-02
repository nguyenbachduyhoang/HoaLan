import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load giỏ hàng từ localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        const isLoggedIn = sessionStorage.getItem('user');
        if (!isLoggedIn) {
          navigate('/login');
          return;
        }

        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart).map(item => ({
            ...item,
            price: typeof item.price === 'string'
              ? parseFloat(item.price.replace(/[.,]/g, ''))
              : item.price,
            quantity: item.quantity || 1, // Đảm bảo số lượng mặc định là 1 nếu không tồn tại
          }));

          setCartItems(parsedCart);
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải giỏ hàng');
        toast.error('Có lỗi xảy ra khi tải giỏ hàng');
        console.error('Cart loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [navigate]);

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (productId) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    } catch (err) {
      toast.error('Không thể xóa sản phẩm. Vui lòng thử lại!');
      console.error('Remove item error:', err);
    }
  };

  // Xử lý cập nhật số lượng sản phẩm
  const handleUpdateQuantity = (productId, newQuantity) => {
    try {
      if (newQuantity < 1) return;

      const updatedCart = cartItems.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err) {
      toast.error('Không thể cập nhật số lượng. Vui lòng thử lại!');
      console.error('Update quantity error:', err);
    }
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    try {
      return cartItems.reduce((total, item) => {
        const price = typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[.,]/g, ''))
          : item.price;

        return total + (price * (item.quantity || 0));
      }, 0);
    } catch (err) {
      console.error('Calculate total error:', err);
      return 0;
    }
  };

  if (isLoading) {
    return <div className="loading">Đang tải giỏ hàng...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Quay về trang chủ</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng trống</p>
          <button onClick={() => navigate('/products')}>Tiếp tục mua sắm</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg'; // Ảnh mặc định khi lỗi
                  }}
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">{item.price.toLocaleString('vi-VN')}đ</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="item-subtotal">
                    Thành tiền: {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </p>
                  <Link to={`/detail/${item.id}`} className="view-detail-button">
                    Xem chi tiết
                  </Link>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-details">
              <p>Tổng số sản phẩm: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <h3>Tổng tiền: {calculateTotal().toLocaleString('vi-VN')}đ</h3>
            </div>
            <button className="checkout-button">Thanh toán</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
