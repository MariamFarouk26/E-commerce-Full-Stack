import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmButton = styled.button`
  height: 4.125rem;
  margin-top: 20px;
  background-color: #088178;
  color: #fff;
  white-space: nowrap;
  border-radius: 12px;
  padding: 12px 30px;
  cursor: pointer;
  border: none;
  outline: none;
  width: 12.5rem;

  &:hover {
    background-color: #065c68;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    // background-color: aqua;
  }
`;

const StyledComponent = styled.div`
  .height-100 {
    height: 100vh;
  }

  .card {
    width: 80rem;
    border: none;
    height: 38rem;
    box-shadow: 0px 5px 10px 0px #d2dae3;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    h6 {
      color: #088178;
      font-size: 40px;
      font-weight: bold;
    }
    div {
      margin-top: 40px;
      color: #818ea0;
      font-size: 25px;
    }
  }

  .inputs input {
    width: 60px;
    height: 60px;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  .card-3 {
    background-color: #efefef;
    padding: 10px;
    width: 73.1rem;
    height: 70rem;
    bottom: -16rem;
    left: 3.5rem;
    position: absolute;
    border-radius: 5px;
  }

  .card-2 {
    background-color: #efefef;
    padding: 10px;
    width: 72.1rem;
    height: 10rem;
    bottom: 10rem;
    left: 0.5rem;
    position: absolute;
    border-radius: 5px;

    .content {
      margin-top: 60px;

      span {
        color: #818ea0;
        font-size: 20px;
        margin: 10px;
        font-weight: 400;
        padding-top: 10px;
      }
    }
  }

  .form-control:focus {
    box-shadow: none;
    border: 2px solid red;
  }
`;

const ResendButton = styled.button`
  height: 3.125rem;
  margin-top: 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#088178")};
  color: #fff;
  white-space: nowrap;
  border-radius: 10px;
  font-size: 18px;
  padding: 2px 30px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: none;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#065c68")};
  }
`;

const UpdatePassCode = () => {
  const SignUpEmail = useSelector((state) => state.SignUpEmail.SignUpEmail);
  const [seconds, setSeconds] = useState(60);
  const [isInputWritten, setIsInputWritten] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]); // State to store the entire code
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleVerify = async () => {
    const code = verificationCode.join("");
    if (code && isInputWritten) {
      axios
        .post("http://localhost:3001/user/verify", {
          email: SignUpEmail,
          code: +code,
        })
        .then((response) => {
          if (response.data.message === "Account Verified") {
            toast.success("Correct Code");
            navigate("/Message");
          } else {
            toast.error("Invalid Code! Please try again");
            setVerificationCode(["", "", "", "", ""]); // Clear input fields
            inputRefs.current[0].focus(); // Focus on the first input field
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast.error(
        "Please enter a valid code and ensure the input is not empty."
      );
    }
  };

  const handleResendCode = () => {
    axios
      .post("http://localhost:3001/user/forgetPass", { email: SignUpEmail })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setSeconds(60);
  };

  const handleInputChange = (index, value) => {
    if (value && !isNaN(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      setIsInputWritten(newCode.some((digit) => digit !== ""));
      if (index < 4 && value.length === 1) {
        inputRefs.current[index + 1].focus(); // Move focus to the next input field
      } else if (index > 0 && value.length === 0) {
        inputRefs.current[index - 1].focus(); // Move focus to the previous input field
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledComponent>
        <div className="container height-100 d-flex justify-content-center align-items-center">
          <div className="position-relative">
            <div className="card p-2 text-center">
              <h6>
                Please enter the one-time password <br />
                to verify your account
              </h6>
              <div>
                <small>A code has been sent to {SignUpEmail} </small>
                <br />
              </div>
              <div
                id="otp"
                className="inputs d-flex flex-row justify-content-center mt-2"
              >
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="m-2 text-center form-control rounded"
                    type="number"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
                <span style={{ padding: "20px" }}>{formatTime()}</span>
              </div>
              <div className="mt-4 ">
                <ConfirmButton
                  onClick={handleVerify}
                  disabled={!isInputWritten}
                  className="px-4 "
                >
                  Confirm
                </ConfirmButton>
              </div>
            </div>
            <div className="card-3">
              <div className="card-2">
                <div className="content d-flex justify-content-center align-items-center">
                  <span>Didn't get the code</span>
                  <ResendButton
                    onClick={handleResendCode}
                    disabled={seconds > 0}
                  >
                    Resend
                  </ResendButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledComponent>
    </>
  );
};

export default UpdatePassCode;
