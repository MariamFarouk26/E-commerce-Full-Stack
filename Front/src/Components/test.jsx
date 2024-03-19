import React from 'react';

import styled from 'styled-components';

// Footer Column
export const FooterColumn = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-start;
  margin-bottom: 5px;
`;

// Footer Logo
export const FooterLogo = styled.img`
  margin-bottom: 15px;
  //   margin-left:10px;
  margin-top: 15px;
  width: 110px;
`;

// Footer Header
export const FooterHeader = styled.h4`
  font-size: 14px;
  padding-bottom: 10px;
  margin-top: 67px;
`;

// Footer Paragraph
export const FooterParagraph = styled.p`
  font-size: 13px;
  margin: 5px 0 8px 0;
`;

// Footer Anchor
export const FooterAnchor = styled.a`
  font-size: 13px;
  text-decoration: none;
  color: #222;
  margin-bottom: 10px;
  display: block;
  //   align-items:flex-start

  &:hover {
    color: #088178;
  }
`;

// Follow Container
export const FollowContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
`;

// Follow Icon
export const FollowIcon = styled.i`
  color: #465b52;
  padding-right: 4px;
  cursor: pointer;

  &:hover {
    color: #088178;
  }
`;

// Install Container
export const InstallContainer = styled.div`
  text-align: left;
  & .row img {
    border: 1px solid #088178;
    border-radius: 6px;
  }
  @media (max-width: 1376px) {
    & .row {
      flex-direction: column;
    }
  }
`;

// Copyright Container
export const CopyrightContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`;

const Test = () => {
  return (
    <footer className="section-p1">
      <div className="container">
        <div className="row"></div>
        <div
          className="row justify-content-evenly "
          style={{ textAlign: 'left' }}
        >
          <div className="col-md-3 ">
            <FooterLogo className="logo" src="assets/img/logo.png" alt="Logo" />
            {/* <FooterLogo className="logo" src="assets/img/logo.png" alt="Logo" /> */}
            <h4
              style={{
                fontSize: '14px',
                paddingBottom: '15px',
                marginTop: '4px',
              }}
            >
              Contact
            </h4>
            <FooterParagraph>
              <strong>Address:</strong> El-Hosary, 6th of October, Giza
            </FooterParagraph>
            <FooterParagraph>
              <strong>Phone:</strong> +01 2222 365 / (+91) 01 2345 6789
            </FooterParagraph>
            <FooterParagraph>
              <strong>Hours:</strong> 10:00 - 18:00, Mon - Sat
            </FooterParagraph>
            <div className="follow">
              <FollowContainer>Follow us</FollowContainer>
              <div className="icon">
                <FollowIcon className="fab fa-facebook-f"></FollowIcon>
                <FollowIcon className="fab fa-twitter"></FollowIcon>
                <FollowIcon className="fab fa-instagram"></FollowIcon>
                <FollowIcon className="fab fa-pinterest-p"></FollowIcon>
                <FollowIcon className="fab fa-youtube"></FollowIcon>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-sm-6 ">
            <FooterHeader>About</FooterHeader>
            <FooterAnchor href="#">About us</FooterAnchor>
            <FooterAnchor href="#">Delivery Information</FooterAnchor>
            <FooterAnchor href="#">Privacy Policy</FooterAnchor>
            <FooterAnchor href="#">Terms & Conditions</FooterAnchor>
            <FooterAnchor href="#">Contact us</FooterAnchor>
          </div>

          <div className="col-md-2 col-sm-6">
            <FooterHeader>My Account</FooterHeader>
            <FooterAnchor href="#">Sign in</FooterAnchor>
            <FooterAnchor href="#">View Cart</FooterAnchor>
            <FooterAnchor href="#">My Wishlist</FooterAnchor>
            <FooterAnchor href="#">Track My Order</FooterAnchor>
            <FooterAnchor href="#">Help</FooterAnchor>
          </div>

          <InstallContainer className="col-md-4 ">
            <FooterHeader>Install App</FooterHeader>
            <FooterParagraph>From App Store or Google Play</FooterParagraph>
            <div className="row justify-content-start ">
              <div className="col-5">
                <img src="assets/img/pay/app.jpg" alt="App Store" />
              </div>
              <div className="col-5">
                <img src="assets/img/pay/play.jpg" alt="Google Play" />
              </div>
            </div>
            <FooterParagraph>Secured Payment Gateways</FooterParagraph>
            <img src="assets/img/pay/pay.png" alt="Payment Gateways" />
          </InstallContainer>
        </div>

        <div className="row">
          <div className="col">
            <CopyrightContainer className="copyright">
              <FooterHeader>
                © 2024, ITI - Made by : Mariam - Sara - Salma - Mohamed - Hossam
                - Mahmoud
              </FooterHeader>
            </CopyrightContainer>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Test;
