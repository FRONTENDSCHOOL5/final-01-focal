import React from 'react';
import styled from 'styled-components';

const BottomSheetSection = styled.section`
  position: fixed;
  inset: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -100;
`;

const BottomSheet = styled.ul`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 36px 26px 16px;
  background-color: var(--white);
  border-radius: 10px 10px 0 0;

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

export default function BottomSheetModal({ children }) {
  return (
    <BottomSheetSection>
      <h2 className="a11y-hidden">메뉴</h2>
      <BottomSheet>{children}</BottomSheet>
    </BottomSheetSection>
  );
}
