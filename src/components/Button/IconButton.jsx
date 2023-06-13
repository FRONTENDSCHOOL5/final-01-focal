import React from 'react';
import styled from 'styled-components';

const Icon = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
`;

export default function IconButton({ children }) {
  return <Icon>{children}</Icon>;
}
