import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IconButton from '../Button/IconButton';

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 84px;
  padding: 10px 0;
  font-size: 10px;
  line-height: 14px;
  color: #767676;
`;

const NavDescription = styled.span`
  font-size: 10px;
`;

export default function NavBarItem({ children, description }) {
  return (
    <StyledLink>
      <IconButton>{children}</IconButton>
      <NavDescription>{description}</NavDescription>
    </StyledLink>
  );
}
