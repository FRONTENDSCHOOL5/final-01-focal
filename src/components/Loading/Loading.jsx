import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--border-color);
  border-radius: 50%;
  border-top: 5px solid var(--main-color);
  animation: ${spin} 0.5s linear infinite;
`;

export default function Loading() {
  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
}
