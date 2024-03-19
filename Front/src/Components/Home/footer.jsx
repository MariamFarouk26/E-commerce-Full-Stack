import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export const Footerr = styled.footer`
  font-size: 11px;
`;

// Footer Logo
export const FooterLogo = styled.img`
  margin-bottom: 15px;
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
  // font-size: 10px;
  margin: 5px 0 8px 0;
`;

// Footer Anchor
export const FooterAnchor = styled.a`
  // font-size: 10px;
  text-decoration: none;
  color: #222;
  margin-bottom: 10px;
  display: block;

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

const Footer = () => {
  const [t, i18n] = useTranslation();

  return (
    <Footerr
      className="section-p1"
      dir={`${i18n.language}` === 'en' ? 'ltr' : 'rtl'}
    >
      <div
        className="container"
      >
        <div className="row"></div>
        <div
          className="row justify-content-evenly  mt-3"
          style={{ textAlign: `${i18n.language === 'en' ? 'left' : 'right'}` }}
          >
          <div className="col-md-3 ">
            <FooterLogo
              className="logo"
              src="../assets/img/logo.jpg"
              alt="Logo"
            />
            {/* <FooterLogo className="logo" src="assets/img/logo.png" alt="Logo" /> */}
            <h4
              style={{
                fontSize: '14px',
                paddingBottom: '15px',
                marginTop: '4px',
              }}
            >
              {t('Contact')}
            </h4>
            <FooterParagraph>
              <strong>{t('Address')}:</strong>{' '}
              {t('El-Hosary, 6th of October, Giza')}
            </FooterParagraph>
            <FooterParagraph>
              <strong>{t('Phone')}:</strong> +01 2222 365 / (+91) 01 2345 6789
            </FooterParagraph>
            <FooterParagraph>
              <strong>{t('Hours')}:</strong> {t('10:00 - 18:00, Mon - Sat')}
            </FooterParagraph>
            <div className="follow">
              <FollowContainer>{t('Follow us')}</FollowContainer>
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
            <FooterHeader>{t('About')}</FooterHeader>
            <FooterAnchor href="#">{t('About us')}</FooterAnchor>
            <FooterAnchor href="#">{t('Delivery Information')}</FooterAnchor>
            <FooterAnchor href="#">{t('Privacy Policy')}</FooterAnchor>
            <FooterAnchor href="#">{t('Terms & Conditions')}</FooterAnchor>
            <FooterAnchor href="#">{t('Contact us')}</FooterAnchor>
          </div>

          <div className="col-md-2 col-sm-6">
            <FooterHeader>{t('My Account')}</FooterHeader>
            <FooterAnchor href="#">{t('Sign in')}</FooterAnchor>
            <FooterAnchor href="#">{t('View Cart')}</FooterAnchor>
            <FooterAnchor href="#">{t('My Wishlist')}</FooterAnchor>
            <FooterAnchor href="#">{t('Track My Order')}</FooterAnchor>
            <FooterAnchor href="#">{t('Help')}</FooterAnchor>
          </div>

          <InstallContainer className="col-md-4 ">
            <FooterHeader>{t('Install App')}</FooterHeader>
            <FooterParagraph>
              {t('From App Store or Google Play')}
            </FooterParagraph>
            <div className="row justify-content-start ">
              <div className="col-5">
                <img src="../assets/img/pay/app.jpg" alt="App Store" />
              </div>
              <div className="col-5">
                <img src="../assets/img/pay/play.jpg" alt="Google Play" />
              </div>
            </div>
            <FooterParagraph>{t('Secured Payment Gateways')}</FooterParagraph>
            <img src="../assets/img/pay/pay.png" alt="Payment Gateways" />
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
    </Footerr>
  );
};

export default memo(Footer);
