import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/icons/icon-arrow-left.svg';
import IconButton from '../Button/IconButton';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);

  & > h1 {
    font-size: 14px;
    margin-left: 8px;
  }
`;

export default function FollowHeader({ children }) {
  return (
    <StyledHeader>
      <IconButton>
        <BackButton />
      </IconButton>
      <h1>{children}</h1>
    </StyledHeader>
  );
}
