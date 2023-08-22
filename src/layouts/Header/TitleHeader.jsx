import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: block;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 40px;

  h1 {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
  }
  p {
    margin-top: 12px;
    color: var(--sub-text-color);
    font-weight: 400;
    font-size: 14px;
  }
`;

export default function TitleHeader({ children, subText }) {
  return (
    <StyledHeader>
      <h1>{children}</h1>
      {subText && <p>{subText}</p>}
    </StyledHeader>
  );
}
