import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import styled from "styled-components";

// Styled components for improved design
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #088178;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #06695e;
  }
`;

const Google = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState("");

  const handleLoginSuccess = (credentialresponse) => {
    setUserData(jwtDecode(credentialresponse.credential));
    setShowAlert(true);
  };

  const handleFormSubmit = () => {
    if (!phoneNumber || !address || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log(phoneNumber);
    axios
      .post("http://localhost:3001/user/reg", {
        sellerProducts: [],
        phone: phoneNumber,
        name: userData.name,
        address: address,
        email: userData.email,
        password: password,
        isAdmin: true,
        isSeller: false,
        isUser: true,
        admit: true,
        recent: [],
        wishlist: [],
        checkout: [],
        cart: [],
        image: " ",
      })
      .then((response) => {
        // Handle response
        console.log("Registration successful", response);
        setShowAlert(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error registering user", error);
        toast.error("Error registering user");
      });
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="822438674667-8jfo5kfet1gs8vlr6llil57a1d86vn78.apps.googleusercontent.com">
        <GoogleLogin
          type="icon"
          shape="rectangular"
          text="G"
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("login failed");
          }}
        ></GoogleLogin>
      </GoogleOAuthProvider>

      {showAlert && (
        <FormContainer className="alert">
          <FormInput
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FormInput
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormButton onClick={handleFormSubmit}>Submit</FormButton>
        </FormContainer>
      )}
    </div>
  );
};

export default Google;
