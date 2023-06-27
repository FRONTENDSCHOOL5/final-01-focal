import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheetSection = styled.section`
  position: fixed;
  inset: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const BottomSheet = styled.ul`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 36px 26px 16px;
  background-color: var(--white);
  border-radius: 10px 10px 0 0;
  animation: ${slideUpAnimation} 0.3s ease-in-out;

  &::before {
    position: absolute;
    content: '';
    top: 16px;
    left: 50%;
    width: 50px;
    height: 4px;
    background-color: var(--border-color);
    border-radius: 5px;
    transform: translateX(-50%);
  }
`;

export default function BottomSheetModal({ children, setIsMenuOpen }) {
  const handleMenu = (e) => {
    e.stopPropagation();
  };

  const handleBackgroundClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <BottomSheetSection onClick={handleBackgroundClick}>
      <h2 className="a11y-hidden">메뉴</h2>
      <BottomSheet onClick={handleMenu}>{children}</BottomSheet>
    </BottomSheetSection>
  );
}
