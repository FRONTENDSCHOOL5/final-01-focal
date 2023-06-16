import React from 'react';
import styled from 'styled-components';

const Icon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
`;

export default function IconButton({ children }) {
  return <Icon>{children}</Icon>;
}
