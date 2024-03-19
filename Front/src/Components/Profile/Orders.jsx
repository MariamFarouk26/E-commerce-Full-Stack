import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Orders({ userData }) {
  const [userOrders, setUserOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const fetchProduct = async (productID) => {
    try {
      const { data: product } = await axios.get(
        `http://localhost:3001/products/${productID}`
      );
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const fetchFirstProductImages = async (orders) => {
      try {
        const productImagesPromises = orders.map(async (order) => {
          const productID = order.productID[0];
          const product = await fetchProduct(productID);
          return product?.images[0];
        });
        const productImages = await Promise.all(productImagesPromises);
        setOrderProducts(productImages);
      } catch (error) {
        console.error("Error fetching images for orders:", error);
      }
    };

    const fetchOrders = async (userID) => {
      try {
        const { data } = await axios.get(`http://localhost:3001/orders`);
        const userOrder = data.filter((order) => order.userID === userID);
        setUserOrders(userOrder);
        fetchFirstProductImages(userOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userData) {
      fetchOrders(userData.userID);
    } else {
      const cookies = new Cookies();
      const JWT = cookies.get("x-auth-token");
      if (JWT) {
        const { user } = jwtDecode(JWT);
        fetchOrders(user.userID);
      }
    }
  }, [userData]);

  useEffect(() => {
    const fetchFirstProductImages = async (orders) => {
      try {
        const productImagesPromises = orders.map(async (order) => {
          const productID = order.productID[0];
          const product = await fetchProduct(productID);
          return product?.images[0];
        });
        const productImages = await Promise.all(productImagesPromises);
        setOrderProducts(productImages);
      } catch (error) {
        console.error("Error fetching images for orders:", error);
      }
    };
    fetchFirstProductImages(userOrders);
  }, [userOrders]);

  return (
    <div>
      <div
        className="w-100 border-bottom"
        style={{ backgroundColor: "#cccccc13" }}
      >
        <h4 className="p-3 mb-0">Orders</h4>
      </div>
      <div className="card-body">
        {userOrders && userOrders.length > 0 ? (
          userOrders.map((order, i) => {
            return (
              <div key={i} className="">
                <div id="profileCard">
                  <div className="d-flex" style={{ gap: "1.5rem" }}>
                    <div style={{ maxWidth: "120px" }}>
                      {orderProducts[i] ? (
                        <img
                          src={`${orderProducts[i]}`}
                          alt="productImg"
                          className="w-100"
                          style={{ borderRadius: "8px" }}
                        />
                      ) : (
                        <div
                          className="spinner-border container-fluid d-flex justify-content-center"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-fill d-flex flex-column justify-content-between">
                      <div className="des">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="brand">
                            Order ID: {order.orderID}
                          </span>
                          <div>
                            <Link
                              className="text-decoration-none"
                              to="/profile/orderDetails"
                              state={{ data: order }}
                            >
                              <h6 style={{ color: "#088178" }}>See Details</h6>
                            </Link>
                          </div>
                        </div>
                        <h5 className="title">
                          Total price: {order.totalPrice}
                        </h5>
                      </div>

                      <div className="footer">
                        <h4 className="badge bg-success">DELIVERED</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No orders yet</div>
        )}
      </div>
    </div>
  );
}
