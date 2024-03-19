import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../Redux/Slice/User';

export default function Card({ product }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product || !product.id) {
    return null;
  }
  async function handleCart(product, e) {
    e.stopPropagation();
    if (!user) {
      return toast.warning('Please Log in First');
    }
    const { status } = await axios.patch(
      `http://localhost:3001/user/${user.userID}`,
      { cart: [...user.cart, product.id] }
    );
    if (status === 200) {
      toast.success('Added to Cart Successfully', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast',
        bodyClassName: 'toast-body',
        toastClassName: 'toast-container',
      });
      dispatch(getUserAction());
    }
  }

  async function handleHeart(product, e) {
    e.stopPropagation();
    if (!user) {
      return toast.warning('Please Log in First');
    }
    if (user?.wishlist?.includes(product.id)) {
      const updatedWishList = user?.wishlist.filter((id) => id !== product.id);
      const { status } = await axios.patch(
        `http://localhost:3001/user/${user.userID}`,
        { wishlist: updatedWishList }
      );
      if (status === 200) {
        dispatch(getUserAction());
        return toast.error('Removed from Your Wishlist!', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'custom-toast',
          bodyClassName: 'toast-body',
          toastClassName: 'toast-container',
        });
      }
    }
    const { status } = await axios.patch(
      `http://localhost:3001/user/${user.userID}`,
      { wishlist: [...user?.wishlist, product.id] }
    );
    if (status === 200) {
      toast.success('Added Successfuly', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast',
        bodyClassName: 'toast-body',
        toastClassName: 'toast-container',
      });
      dispatch(getUserAction());
    }
  }

  async function handleNavigate(id) {
    if (user) {
      await axios
        .patch(`http://localhost:3001/user/${user?.userID}`, {
          recent: [id, ...user.recent],
        })
        .then(() => {
          dispatch(getUserAction());
        });
    }
    navigate('/details/' + +id);
  }

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.ratings);
    const remainder = product.ratings - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    if (remainder >= 0.5) {
      stars.push(<i key={stars.length} className="fa-solid fa-star-half"></i>);
    }

    return stars;
  };

  return (
    <section
      id="card"
      className="position-relative"
      onClick={() => handleNavigate(product.id)}
    >
      <div
        className="image-container"
        style={{ height: '200px', overflow: 'hidden', borderRadius: '20px' }}
      >
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : '../../public/assets/img/'
          }
          alt="productImg"
          className="w-100"
          style={{ objectFit: 'contain', height: '100%', width: 'auto' }}
        />
      </div>
      {!product.boycott && (
        <div
          className="position-absolute py-1 px-2"
          style={{ top: '20px', right: '20px' }}
        >
          <i
            className={`fa-heart${
              user && user?.wishlist?.includes(product.id)
                ? ' fas text-danger'
                : ' far'
            }`}
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={(e) => handleHeart(product, e)}
          ></i>
        </div>
      )}
      <div className="des">
        {product.boycott && (
          <h6>
            <span className="badge bg-danger">Boycott</span>
          </h6>
        )}

        <span className="brand">{product.brand}</span>
        <h5 className="title">
          {product.title.length < 20
            ? product.title
            : product.title.slice(0, 20) + '...'}
        </h5>
        <div className="stars">
          <span className="brand">({product.ratings})</span>
          <span>{renderStars()}</span>
        </div>
      </div>

      <div className="footer d-flex align-items-center justify-content-between">
        <h4 className="price">${product.price}</h4>
        {!product.boycott && (
          <div className="cart" onClick={(e) => handleCart(product, e)}>
            <i className="fa fa-cart-shopping"></i>
          </div>
        )}
      </div>
    </section>
  );
}
