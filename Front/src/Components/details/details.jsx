import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProdetails } from "../../Redux/Slice/prodetails";
import { toast } from "react-toastify";
import { getUserAction } from "../../Redux/Slice/User";

const ProDetailsSection = styled.section`
  display: flex;
  margin-top: 20px;
  font-family: "Spartan", sans-serif;
  font-size: 0.8em;
`;

const SingleProImage = styled.div`
  width: 40%;
  margin-right: 50px;

  img {
    width: 100%;
  }

  .small-img-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .small-img-col {
      flex-basis: 35%;
      margin: 2px;

      img {
        width: 100%;
      }
    }
  }
`;

const SingleProDetails = styled.div`
  width: 50%;
  padding-top: 30px;

  h6 {
    margin-bottom: 10px;
    font-size: 18px;
  }

  h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 25px;
    color: #088178;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  h3 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  select {
    display: block;
    width: 195px;
    padding: 10px;
    margin-bottom: 10px;
  }

  input {
    width: 50px;
    height: 40px;
    padding-left: 10px;
    font-size: 16px;
    margin-right: 10px;
    text-align: center;
    inputmode: "numeric";
  }

  button {
    border: none;
    border-radius: 5px;
    background-color: #088178;
    color: #fff;
    padding: 10px 15px;
    margin-top: 10px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  h4 {
    font-size: 20px;
    margin-top: 20px;
  }

  span {
    font-size: 15px;
  }
`;
const Details = () => {
  const { ProductId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [ProDetails, setProDetails] = useState([]);

  async function handleCart(product, e) {
    console.log(product);
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

  useEffect(() => {
    const getProDetails = async () => {
      await axios
        .get(`http://localhost:3001/products/${ProductId}`)
        .then((response) => {
          setProDetails(response.data);
          // console.log( response.data)
          dispatch(setProdetails(response.data));
        });
    };
    getProDetails();
  }, [ProductId, dispatch]);

  return (
    <div className="container">
      <ProDetailsSection className="section-p1">
        <SingleProImage className="text-center overflow-hidden">
          {ProDetails.images && ProDetails.images.length > 0 ? (
            <div
              style={{
                height: "200px",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <img
                style={{ objectFit: "contain", height: "100%", width: "auto" }}
                src={ProDetails.images[0]}
                alt="Main Product"
              />
            </div>
          ) : (
            <img src="assets/img/products/f2.jpg" alt="Main Product" />
          )}
          <div className="small-img-group">
            {ProDetails.images &&
              ProDetails.images.map((image, index) => (
                <div className="small-img-col" key={index}>
                  <div
                    style={{
                      height: "150px",
                      overflow: "hidden",
                      borderRadius: "20px",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "contain",
                        height: "100%",
                        width: "100%",
                      }}
                      src={ProDetails.images[index]}
                      alt="sub Product"
                    />
                  </div>
                </div>
              ))}
          </div>
        </SingleProImage>

        <SingleProDetails>
          <h3>{ProDetails.title}</h3>
          <h6>{ProDetails.category}</h6>
          <h2>
            $
            {ProDetails.price
              ? ProDetails.price.toFixed(2)
              : "Price not available"}
          </h2>

          {/* <input
            type="number"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
          /> */}
          <button className="normal" onClick={(e) => handleCart(ProDetails, e)}>
            Add To Cart
          </button>
          <h4>Product Details:</h4>
          <span>{ProDetails.description}</span>
        </SingleProDetails>
      </ProDetailsSection>
    </div>
  );
};

export default Details;
