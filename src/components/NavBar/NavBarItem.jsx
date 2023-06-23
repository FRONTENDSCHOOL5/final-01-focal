import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export default function NavBarItem({ to, onClick, children, description }) {
  return (
    <StyledLink to={to} onClick={onClick}>
      {children}
      <NavDescription>{description}</NavDescription>
    </StyledLink>
  );
}
