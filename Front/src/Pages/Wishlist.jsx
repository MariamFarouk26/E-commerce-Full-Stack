import React, { useState } from "react";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/footer";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserAction } from "../Redux/Slice/User";

export default function Wishlist() {
  let user = useSelector((state) => state.user.user);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  async function handleHeart(product, e) {
    e.stopPropagation();
    if (!user) {
      return toast.warning("Please Log in First");
    }
    if (user?.wishlist?.includes(product.id)) {
      const updatedWishList = user?.wishlist.filter((id) => id !== product.id);
      const { status } = await axios.patch(
        `http://localhost:3001/user/${user.userID}`,
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
    const { status } = await axios.patch(
      `http://localhost:3001/user/${user.userID}`,
      { wishlist: [...user?.wishlist, product.id] }
    );
    if (status === 200) {
      toast.success("Added Successfuly", {
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

  async function handleCart(product, e) {
    e.stopPropagation();
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    return stars;
  };

  useEffect(() => {
    if (user) {
      async function getProduct() {
        const productPromises = user.wishlist.map(async (id) => {
          const { data } = await axios.get(
            "http://localhost:3001/products/" + id
          );
          return data;
        });

        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts);
      }

      getProduct();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div id="wishlist">
        <Section className=" container-fluid  ">
          <Text className="row justify-content-evenly">
            <H2>My Wishlist</H2>
          </Text>
        </Section>

        <div className="section-p1">
          <div className="row">
            {products.length === 0 ? (
              <div
                id="empty-cart"
                className="d-flex justify-content-center align-items-center vh-75"
              >
                <h1>
                  Your Wish List is{" "}
                  <span style={{ fontWeight: "800", color: "#088178" }}>
                    Empty
                  </span>
                </h1>
              </div>
            ) : (
              products.map((product, i) => {
                return (
                  <section key={i} className="">
                    <div id="card">
                      <div className="d-flex" style={{ gap: "1.5rem" }}>
                        <div style={{ maxWidth: "200px" }}>
                          <img
                            src={product.images[0]}
                            alt="productImg"
                            className="w-100"
                            style={{ borderRadius: "20px" }}
                          />
                        </div>

                        <div className="flex-fill">
                          <div className="des">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="brand">{product.brand}</span>
                              <div>
                                <i
                                  className="fas fa-heart"
                                  style={{
                                    color: "#ab2402",
                                    fontSize: "2rem",
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => handleHeart(product, e)}
                                ></i>
                              </div>
                            </div>
                            <h5 className="title">{product.title}</h5>
                            <div className="stars">
                              <span className="brand"> ({product.rating})</span>
                              {renderStars(product.rating).map((el) => el)}
                            </div>
                          </div>

                          <div className="footer d-flex align-items-center justify-content-between">
                            <h4 className="price">${product.price}</h4>
                            <div
                              className="cart"
                              onClick={(e) => handleCart(product, e)}
                            >
                              <i className="fa fa-cart-shopping"></i>
                              <span>add to cart</span>
                              <ToastContainer />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })
            )}
          </div>
          <Link to="/cart">
            <button
              type="button"
              className="btn btn-primary"
              style={{
                backgroundColor: "#088178",
                marginLeft: "48%",
                marginTop: "10rem",
                border: "1px solid #088178",
              }}
            >
              My Cart
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

const Section = styled.section`
  background-image: url("assets/img/about/banner.png");
  width: 100%;
  height: 20vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 14px;
`;

const Text = styled.div`
  margin-top: 20px;
  font-family: "Spartan", sans-serif;
  margin-bottom: 20px; /* Add some space between sections */
`;

const H2 = styled.h2`
  color: white;
  font-weight: 800;
`;
