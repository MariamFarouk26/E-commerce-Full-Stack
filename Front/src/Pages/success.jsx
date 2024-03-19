import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import confetti from "canvas-confetti";

const Success = () => {
  const cookies = new Cookies();
  const JWT = cookies.get("x-auth-token");
  if (JWT) {
    var { user } = jwtDecode(JWT);
  }

  const runFireworks = () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  useEffect(() => {
    if (JWT) {
      async function setOrders() {
        const cartData = JSON.parse(sessionStorage.getItem("cartData"));
        const { status } = await axios.post(
          `http://localhost:3001/orders`,
          {
            userID: user.userID,
            userEmail: user.email,
            totalPrice: cartData[1],
            productID: cartData[0].map((product) => product.id),
            category: cartData[0].map((product) => product.category),
            __v: 0,
          },
          {
            headers: {
              "x-auth-token": JWT,
              "Content-Type": "application/json",
            },
          }
        );
        if (status === 201) {
          await axios.patch(`http://localhost:3001/user/${user.userID}`, {
            cart: [],
          });
        }
      }
      setOrders();
      runFireworks();
    }
  }, [JWT, user.email, user.userID]);

  return (
    <SuccessWrapper>
      <SuccessCard className="card">
        <div className="text-center">
          <SuccessIcon />
          <SuccessHeading>Thank you for your order!</SuccessHeading>
          <EmailMsg>Check your email inbox for the receipt.</EmailMsg>
          <Description>
            If you have any questions, please email{" "}
            <EmailLink href="mailto:order@example.com">
              order@example.com
            </EmailLink>
          </Description>
          <Link to="/">
            <button type="button" className="btn btn-primary btn-lg mt-3">
              Continue Shopping
            </button>
          </Link>
        </div>
      </SuccessCard>
    </SuccessWrapper>
  );
};

export default Success;

const confettiAnimation = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 1; }
`;

const SuccessWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SuccessCard = styled.div`
  max-width: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  animation: ${confettiAnimation} 2s ease-out;
  background-color: whitesmoke;
  border: 1px solid lightgrey;
`;

const SuccessIcon = styled(BsBagCheckFill)`
  font-size: 5rem;
  color: #28a745;
`;

const SuccessHeading = styled.h2`
  font-size: 1.5rem;
  margin-top: 20px;
`;

const EmailMsg = styled.p`
  font-size: 1rem;
  margin-top: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-top: 10px;
`;

const EmailLink = styled.a`
  color: #007bff;
`;
