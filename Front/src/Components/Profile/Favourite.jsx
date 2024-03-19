import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserAction } from "../../Redux/Slice/User";

export default function Favourite({ userData }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchProduct = async (productId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/products/${productId}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      // console.log(userData.userID)
      try {
        const wishlistData = await axios.get(
          `http://localhost:3001/user/${userData.userID}`
        );
        // console.log(wishlistData.data[0])
        const wishlist = wishlistData?.data[0]?.wishlist;
        const productPromises = wishlist.map(async (productId) => {
          const product = await fetchProduct(productId);
          // console.log(product);
          return product;
        });
        const products = await Promise.all(productPromises);
        // console.log(products);
        setWishlistProducts(products);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      }
    };
    if (userData) {
      fetchWishlistProducts();
    }
  }, [userData]);

  async function handleHeart(product) {
    const updatedWishList = userData?.wishlist.filter(
      (id) => id !== product.id
    );
    const { status } = await axios.patch(
      `http://localhost:3001/user/${userData.userID}`,
      { wishlist: updatedWishList }
    );
    if (status === 200) {
      dispatch(getUserAction());
      return toast.error("Removed from Your Wishlist!", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast",
        bodyClassName: "toast-body",
        toastClassName: "toast-container",
      });
    }
  }

  const renderStars = (ratings) => {
    const stars = [];
    const fullStars = Math.floor(ratings);
    const remainder = ratings - fullStars;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="fas fa-star" style={{ color: "#efbb2d" }}></i>
      );
    }

    // Half star
    if (remainder >= 0.5) {
      stars.push(
        <i
          key={stars.length}
          className="fa-solid fa-star-half"
          style={{ color: "#efbb2d" }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div>
      <div
        className="w-100 border-bottom"
        style={{ backgroundColor: "#cccccc13" }}
      >
        <h4 className="p-3 mb-0">Favourite</h4>
      </div>
      <div className="card-body">
        {wishlistProducts && wishlistProducts.length > 0 ? (
          wishlistProducts?.map((product, i) => {
            return (
              <div key={i} className="">
                <div id="profileCard">
                  <div className="d-flex" style={{ gap: "1.5rem" }}>
                    <div
                      className="image-container"
                      style={{
                        height: "120px",
                        overflow: "hidden",
                        borderRadius: "12px",
                      }}
                    >
                      <img
                        src={product?.images[0]}
                        alt="productImg"
                        className="w-100"
                        style={{
                          objectFit: "contain",
                          height: "100%",
                          width: "auto",
                        }}
                      />
                    </div>

                    <div className="flex-fill d-flex flex-column justify-content-between">
                      <div className="des">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="brand">{product?.brand}</span>
                          <div>
                            <i
                              className="fa-solid fa-heart"
                              style={{
                                color: "#ab2402",
                                fontSize: "2rem",
                                cursor: "pointer",
                              }}
                              onClick={() => handleHeart(product)}
                            ></i>
                          </div>
                        </div>
                        <h5 className="title">{product?.title}</h5>
                      </div>

                      <div className="footer">
                        <div className="stars mb-2">
                          <span className="brand"> ({product?.ratings}) </span>
                          {renderStars(product?.ratings)}
                        </div>
                        <h6 className="mb-0">${product?.price}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No wishlist items</div>
        )}
      </div>
    </div>
  );
}
