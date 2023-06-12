import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--white);
  background-color: var(--main-color);

  &.xs {
    font-size: 12px;
    font-weight: 400;
    min-width: 56px;
    padding: 7px 0;
    border-radius: 26px;
  }

  &.sm {
    font-size: 14px;
    font-weight: 500;
    min-width: 90px;
    padding: 7px 0;
    border-radius: 32px;
  }

  &.md {
    font-size: 14px;
    font-weight: 500;
    min-width: 120px;
    padding: 8px 0;
    border-radius: 30px;
  }

  &.lg {
    font-size: 14px;
    font-weight: 500;
    min-width: 322px;
    padding: 13px 0;
    border-radius: 44px;
  }

  &.xs,
  &.md {
    background-color: ${(props) =>
      props.active ? 'var(--main-color)' : 'var(--white)'};
    color: ${(props) =>
      props.active ? 'var(--white)' : 'var(--sub-text-color)'};
    border: ${(props) =>
      props.active ? 'none' : '1px solid var(--border-color)'};
  }

  /* &.cancel {
    color: var(--sub-text-color);
    background-color: var(--white);
    border: 1px solid var(--border-color);
  } */

  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default function Button({
  className,
  active,
  disabled = false,
  children,
}) {
  return (
    <StyledButton className={className} active={active} disabled={disabled}>
      {children}
    </StyledButton>
  );
}
