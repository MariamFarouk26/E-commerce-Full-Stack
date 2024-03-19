import React, { memo } from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
  background-image: url('assets/img/banner/b1.WebP');
  background-size: cover;
  background-position: center;
  padding: 50px 20px;
  text-align: center;
  height: 15rem;
  margin: 5rem 0;

  h3 {
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    margin: 0;
  }
`;

const ImageBanner3 = () => {
  return (
    <StyledBanner className="container-fluid d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col">
          <h3>Sales Up to 70%</h3>
        </div>
      </div>
    </StyledBanner>
  );
};

export default memo(ImageBanner3);
