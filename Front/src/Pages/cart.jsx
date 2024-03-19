import React, { useEffect, useState } from "react";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/footer";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../Redux/Slice/User";
import { toast } from "react-toastify";

const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [copoun, setCoupon] = useState(0);

  useEffect(() => {
    if (user) {
      const sortedArr = [...user.cart].sort((a, b) => a - b);
      const quantityArr = [];

      let currentNumber = sortedArr[0];
      let count = 1;

      for (let i = 1; i < sortedArr.length; i++) {
        if (sortedArr[i] === currentNumber) {
          count++;
        } else {
          quantityArr.push(count);
          count = 1;
          currentNumber = sortedArr[i];
        }
      }
      quantityArr.push(count);

      async function getProduct() {
        let uniqueSortedArr = new Set(sortedArr);
        uniqueSortedArr = [...uniqueSortedArr];
        const productPromises = uniqueSortedArr.map(async (id, i) => {
          const { data } = await axios.get(
            "http://localhost:3001/products/" + id
          );
          return { ...data, quantity: quantityArr[i] };
        });

        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts);
      }
      getProduct();
    }
  }, [user]);

  useEffect(() => {
    function calculateTotals() {
      let sum = 0;
      products.forEach((product) => {
        sum += product.price * product.quantity;
      });
      setSubtotal(sum);
      setTotal(sum);
    }
    calculateTotals();
  }, [products]);

  async function handleAdd(product) {
    await axios.patch(`http://localhost:3001/user/${user.userID}`, {
      cart: [...user.cart, product.id],
    });
    dispatch(getUserAction());
  }

  async function handleSubtract(product) {
    let updatedCart = [...user.cart];
    let indexToRemove = updatedCart.indexOf(product.id);

    if (indexToRemove !== -1) {
      updatedCart.splice(indexToRemove, 1);
    }

    await axios.patch(`http://localhost:3001/user/${user.userID}`, {
      cart: updatedCart,
    });
    dispatch(getUserAction());
  }

  async function handleRemove(id) {
    await axios.patch(`http://localhost:3001/user/${user.userID}`, {
      cart: user.cart.filter((ID) => ID !== id),
    });
    dispatch(getUserAction());
  }

  function handleChange(product, quantity) {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity };
      }
      return p;
    });
    setProducts(updatedProducts);
  }

  async function handlePayment() {
    const stripe = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );

    const response = await axios.post(
      "http://localhost:3001/check-out/checkout",
      {
        products: products,
        subtotal: subtotal,
        total: total,
      }
    );

    toast.loading("Redirecting...");

    const result = stripe.redirectToCheckout({
      sessionId: response.data.sessionId,
    });

    // Store cartData in session storage
    sessionStorage.setItem("cartData", JSON.stringify([products, total]));

    if (result.error) {
      console.log(result.error);
    }
  }

  function handleCoupon() {
    const userCoupon = document.getElementById("couponInput").value;
    if (userCoupon === "ITI-2024" && copoun === 0) {
      setTotal(total / 2);
      setCoupon(1);
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <main>
        <section
          className="container-fluid d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            backgroundImage: "url('./Assets/img/about/banner.png')",
            height: "40vh",
            backgroundSize: "cover",
            padding: "1rem",
            color: "#fff",
          }}
        >
          <h1>#Cart_page</h1>
          <p className="text-white">
            LEAVE A MESSAGE. We love to hear form you.
          </p>
        </section>

        <section id="cart" className="section-p1">
          <div className="table-responsive">
            <table className="table border-0">
              <thead className="thead-light">
                <tr>
                  <th
                    scope="col"
                    className="border-top-0 align-middle text-center"
                  >
                    Remove
                  </th>
                  <th
                    scope="col"
                    className="border-top-0 align-middle text-center"
                  >
                    Images
                  </th>
                  <th
                    scope="col"
                    className="border-top-0 align-middle text-center"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="border-top-0 align-middle text-center"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="border-top-0 align-middle text-center"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="border-top-0 align-middle text-center"
                  >
                    Subtotal
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr
                    id="empty-cart"
                    className="d-flex justify-content-center align-items-center vh-75"
                  >
                    <td>
                      <h1>
                        Your Cart is{" "}
                        <span style={{ fontWeight: "800", color: "#088178" }}>
                          Empty
                        </span>
                      </h1>
                    </td>
                  </tr>
                ) : (
                  products?.map((product) => (
                    <tr id={product.id} key={product.id}>
                      <td className="align-middle text-center">
                        <i
                          className="far fa-times-circle"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemove(product.id)}
                        ></i>
                      </td>
                      <td className="align-middle text-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="img-fluid"
                          style={{ width: "4.5rem", borderRadius: "5px" }}
                        />
                      </td>
                      <td className="align-middle text-center">
                        {product.title}
                      </td>
                      <td className="align-middle text-center">
                        ${product.price}
                      </td>
                      <td className="align-middle text-center">
                        <div className="input-group d-flex justify-content-center">
                          <input
                            type="text"
                            value={product.quantity}
                            className="form-control mx-2 text-center"
                            style={{
                              Width: "0.5rem",
                              maxWidth: "100px",
                              minWidth: "50px",
                            }}
                            onChange={handleChange}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => handleAdd(product)}
                              style={{ lineHeight: "1.1rem" }}
                            >
                              <i className="fa-solid fa-angle-up"></i>
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => handleSubtract(product)}
                              style={{ lineHeight: "1.1rem" }}
                            >
                              <i className="fa-solid fa-angle-down"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle text-center suptotal">
                        ${product.price * product.quantity}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section id="cart-add" className="section-p1">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-between">
                <div id="coupon" className="mb-4">
                  <h3>Apply Coupon</h3>
                  <div className="input-group">
                    <input
                      id="couponInput"
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Coupon"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary mx-2"
                        style={{
                          backgroundColor: "#088178",
                          border: "1px solid #088178",
                        }}
                        onClick={handleCoupon}
                        disabled={total ? false : true}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div id="subtotal">
                  <h3>Cart Totals</h3>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Cart Subtotals</td>
                        <td id="sup-price">$ {subtotal}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td>Free</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        {copoun === 0 ? (
                          <td id="total-price">
                            <strong>$ {total}</strong>
                          </td>
                        ) : (
                          <td id="total-price">
                            <strong style={{ textDecoration: "line-through" }}>
                              $ {subtotal}
                            </strong>
                            <strong className="mx-2">$ {total}</strong>
                            <p>50% discount for ITI members</p>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <button
                    disabled={total ? false : true}
                    className="btn btn-primary btn-block"
                    style={{
                      backgroundColor: "#088178",
                      border: "1px solid #088178",
                    }}
                    onClick={handlePayment}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </>
  );
};

export default Cart;
