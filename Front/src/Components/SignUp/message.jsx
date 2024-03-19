import React from 'react';
import { Link } from 'react-router-dom';
import styled ,{ createGlobalStyle } from 'styled-components';




const Button = styled.button`
height: 4.125rem;
margin-top: 20px;
background-color: #088178;
color: #fff;
font-weight: 600;
font-size:18px;
white-space: nowrap;
border-radius: 12px;
padding: 12px 30px;
cursor: pointer;
border: none;
outline: none;
width:12.5rem;

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

    p {
      color: #088178;
      font-size: 40px;
      font-weight:bold;
      
    }
`;


const H4 =styled.h4`
    margin: 20px;
    line-height:52px;

`;
const Message = () => {
    return (      
            <>
        <GlobalStyle/>
        <StyledComponent>
          <div className="container height-100 d-flex justify-content-center align-items-center">
            <div className="position-relative">
              <div className="card p-2 text-center">
                <h4 style={{"fontSize":"30px" ,"fontWeight":"700"}}>We appreciate your interest in selling on our platform. </h4>
              <H4 className="card-text ">
                        
                        <br />
                        Kindly verify the Image ID for your listings within <b style={{"color":"#088178"}}>24 hours</b>. 
                        Once done, you'll receive further instructions via email. During this time,
                         we'll grant you permission to sell your products.
                         <br />
                          Contact us if you need assistance. 
                         <br></br>
                         <b style={{"color":"#088178"}}> Thank you! </b>
                    </H4>
                        <Link to="/" className=" nav-link">
                          <Button >Go to Home</Button>
                          </Link>
              </div>
        </div>
      </div>
    </StyledComponent>
    </>
    );
}

export default Message;
