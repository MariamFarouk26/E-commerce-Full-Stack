import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserAction } from "../../Redux/Slice/User";

export default function OrderDetails() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [allProduct, setAllProduct] = useState(null);

  const fetchProduct = async (productID) => {
    try {
      const { data: products } = await axios.get(
        `http://localhost:3001/products/${productID}`
      );
      return products;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  async function handleCart(product) {
    if (!user) {
      return toast.warning("Please Log in First");
    }
    const { status } = await axios.patch(
      `http://localhost:3001/user/${user.userID}`,
      { cart: [...user.cart, product.id] }
    );
    if (status === 200) {
      toast.success("Added to Cart Successfully", {
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
      dispatch(getUserAction());
    }
  }

  useEffect(() => {
    // console.log(location)
    if (location.state && location.state.data) {
      // setProduct(location.state.data);
      const fetchProductsForOrders = async (product) => {
        // console.log(product);
        try {
          const productsPromises = product?.map(async (order) => {
            // Fetch product details for each order
            const productData = await fetchProduct(order);
            return productData;
          });
          // console.log(productsPromises);
          const products = await Promise.all(productsPromises);
          // Return the products array
          setAllProduct(products);
          return products;
        } catch (error) {
          console.error("Error fetching products for orders:", error);
          // Return an empty array in case of error
          return [];
        }
      };
      fetchProductsForOrders(location.state.data.productID);
    }
  }, [location]);

  const renderStars = (ratings) => {
    const stars = [];
    const fullStars = Math.floor(ratings);
    const remainder = ratings - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="fas fa-star" style={{ color: "#efbb2d" }}></i>
      );
    }

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
        <h4 className="p-3 mb-0">Order: {location?.state?.data?.orderID}</h4>
      </div>
      <div className="card-body">
        {allProduct?.map((product, i) => {
          return (
            <div key={i} className="">
              <div id="profileCard">
                <div className="d-flex" style={{ gap: "1.5rem" }}>
                  <div style={{ maxWidth: "120px" }}>
                    <img
                      src={product.images[0]}
                      alt="productImg"
                      className="w-100"
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="flex-fill d-flex flex-column justify-content-between">
                    <div className="des">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="brand">{product.brand}</span>
                        <div>
                          <NavLink
                            to={{
                              pathname: "/profile/account",
                              state: { product },
                            }}
                            className="text-decoration-none"
                          >
                            <button
                              className="btn"
                              style={{ color: "#088178" }}
                              onClick={() => handleCart(product)}
                            >
                              Buy Again
                            </button>
                          </NavLink>
                        </div>
                      </div>
                      <h5 className="title">{product.title}</h5>
                    </div>

                    <div className="footer">
                      <div className="stars mb-2">
                        <span className="brand"> ({product.ratings}) </span>
                        {renderStars(product.ratings)}
                      </div>
                      <h6 className="mb-0">${product.price}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
