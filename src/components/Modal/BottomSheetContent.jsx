import React from 'react';
import styled from 'styled-components';

const BottomSheetItem = styled.li`
  padding: 12px 0;
  cursor: pointer;

  button {
    font-size: 14px;
  }
`;

export default function BottomSheetContent({ onClick, children }) {
  return (
    <BottomSheetItem onClick={onClick}>
      <button>{children}</button>
    </BottomSheetItem>
  );
}
