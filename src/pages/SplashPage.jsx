import styled, { keyframes } from 'styled-components';
import mainLogo from '../assets/images/main-logo.png';

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledSplash = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100vh;
  background-color: white;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    display: block;
    margin: auto;
    animation: ${boxFade} 1.5s linear 0.5s;
  }
`;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/welcome');
    }, 1800);
  }, []);

  return (
    <StyledSplash>
      <h1 className="a11y-hidden">splash화면</h1>
      <img src={mainLogo} alt="메인로고" />
    </StyledSplash>
  );
}
