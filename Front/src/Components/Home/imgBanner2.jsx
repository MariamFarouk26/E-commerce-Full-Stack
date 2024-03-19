import React, { memo } from 'react';
import styled from 'styled-components';

const ImgBanner2 = () => {
    return (
    <div className='container'>
      <div className='row justify-content-evenly ' >
        <BannerBox1 className='col-md-3 col-xsm-12' >
          <BannerH2>SEASONAL SALE</BannerH2>
          <BannerH3>Spring / Summer 2023</BannerH3>
        </BannerBox1>
        <BannerBox2 className='col-md-4 col-xsm-12'>
          <BannerH2>NEW FOOTWEAR COLLECTION</BannerH2>
          <BannerH3>Winter Collection -50% OFF</BannerH3>
        </BannerBox2>
        <BannerBox3 className='col-md-3 col-xsm-12'>
          <BannerH2>T-SHIRTS</BannerH2>
          <BannerH3>New Trendy Prints</BannerH3>
        </BannerBox3>
      </div>
    </div>
  );
}

export default memo(ImgBanner2);

const BannerBox1 = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
background-image: url('assets/img/banner/b22.WebP');  /* Replace with your actual image path */
min-width: 30%;
height: 30vh;
background-size: cover;
background-position: center;
padding: 20px;
margin-bottom: 20px;

`;
const BannerBox2 = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
background-image: url('assets/img/banner/b23.WebP');  /* Replace with your actual image path */
min-width: 30%;
height: 30vh;
background-size: cover;
background-position: center;
padding: 20px;
margin-bottom: 20px;
`;

const BannerBox3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-image: url('assets/img/banner/b24.WebP');  /* Replace with your actual image path */
  min-width: 30%;
  height: 30vh;
  background-size: cover;
  background-position: center;
  padding: 20px;
  margin-bottom: 20px;
`;

const BannerH2 = styled.h2`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
`;

const BannerH3 = styled.h3`
  color: #ec544e;
  font-size: 10px;
  font-weight: 800;
`;


