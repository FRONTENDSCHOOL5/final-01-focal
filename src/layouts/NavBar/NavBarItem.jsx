import React from 'react';
import styled, { css } from 'styled-components';
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

  ${({ $isactive }) =>
    $isactive
      ? css`
          stroke: var(--main-color);
          fill: var(--main-color);

          path:nth-child(2) {
            stroke-width: 0.5;
          }
        `
      : css`
          stroke: var(--sub-text-color);
          fill: var(--white);

          path:nth-child(2) {
            stroke-width: 2;
          }
        `}
`;

const NavDescription = styled.span`
  font-size: 10px;
`;

export default function NavBarItem({ to, children, description, isActive }) {
  return (
    <StyledLink to={to} $isactive={isActive}>
      {children}
      <NavDescription>{description}</NavDescription>
    </StyledLink>
  );
}
