import React, { useRef, useEffect, useState, memo } from 'react';
import styled, { css, keyframes } from 'styled-components';

const countUp = (start, end, duration, setValue) => {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    setValue(current);
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
};

const changeColors = (setTextColor) => {
  setTimeout(() => {
    setTextColor('#088178');
  }, 5000); // Start changing colors after 5 seconds
};

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, #3f51b5, #2196f3);
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimatedNumber = styled.div`
  font-size: calc(0.8rem + 1.5vw); /* Base font size with additional scaling based on viewport width */
  font-weight: bold;
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${bounce} 2s ease-in-out;
    `}
    @media (max-width: 648px) {
      display: none;
    }
`;

const Statistics = () => {
  const containerRef = useRef(null);
  const [textColor, setTextColor] = useState('#8ba9c0');
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  useEffect(() => {
    countUp(0, 2000, 5000, setValue1);
    countUp(0, 1500, 5000, setValue2);
    countUp(0, 1000, 5000, setValue3);
    changeColors(setTextColor);
  }, [textColor]);

  return (
    <div ref={containerRef}>
      <Container style={{ margin: "2rem 0" }}>
        <SubContainer>
          <AnimatedNumber isVisible={value1 > 0}>+{value1}&nbsp;<b>Orders</b></AnimatedNumber>
        </SubContainer>
        <SubContainer>
          <AnimatedNumber isVisible={value2 > 0}>+{value2}&nbsp;<b>Customers</b></AnimatedNumber>
        </SubContainer>
        <SubContainer>
          <AnimatedNumber isVisible={value3 > 0}>+{value3}&nbsp;<b>Sellers</b></AnimatedNumber>
        </SubContainer>
      </Container>
    </div>
  );
};

export default memo(Statistics);
