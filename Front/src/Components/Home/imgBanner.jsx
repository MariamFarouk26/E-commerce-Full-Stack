import React, { memo } from 'react';
import styled from 'styled-components';

const SmBannerSection = styled.section`
  // padding: 20px;
`;

const BannerBox = styled.div`
  position: relative; /* Add position relative */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-image: url('assets/img/banner/b10.WebP');
  height: 300px;
  background-size: cover;
  background-position: center;
  padding: 30px;
  margin-bottom: 20px;
`;

const BannerBox2 = styled(BannerBox)`
  background-image: url('assets/img/banner/b21.WebP');
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
`;

const BannerH4 = styled.h4`
  color: #fff;
  font-size: 20px;
  font-weight: 300;
`;

const BannerH2 = styled.h2`
  color: #fff;
  font-size: 28px;
  font-weight: 800;
`;

const BannerSpan = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 15px;
`;

const HoverButton = styled.button`
  background: ${(props) => (props.hovered ? '#088178' : 'transparent')};
  border: 1px solid ${(props) => (props.hovered ? '#088178' : '#fff')};
  color: #fff;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
`;

const ImgBanner = () => {
  return (
    <SmBannerSection className="container">
      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <BannerBox>
            <BannerH4>Crazy Deals</BannerH4>
            <BannerH2>Buy 1 Get 1 Free</BannerH2>
            <BannerSpan>The best classic dress is on sale at Cara</BannerSpan>
            <HoverButton>Learn More</HoverButton>
          </BannerBox>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <BannerBox2>
            <Overlay>
              <BannerH4>Spring/Summer</BannerH4>
              <BannerH2>Upcoming Season</BannerH2>
              <BannerSpan>The best classic dress is on sale at Cara</BannerSpan>
              <HoverButton>Collection</HoverButton>
            </Overlay>
          </BannerBox2>
        </div>
      </div>
    </SmBannerSection>
  );
};

export default memo(ImgBanner);
