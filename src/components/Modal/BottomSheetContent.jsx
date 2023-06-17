import React from 'react';
import styled from 'styled-components';

const BottomSheetItem = styled.li`
  font-size: 14px;
  padding: 12px 0;
  cursor: pointer;
`;

export default function BottomSheetContent({ onClick, children }) {
  return (
    <BottomSheetItem>
      <button onClick={onClick}>{children}</button>
    </BottomSheetItem>
  );
}
