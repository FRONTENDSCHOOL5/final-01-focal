import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  background-color: var(--main-color);
  border-radius: 4px;

  &.xs {
    font-size: 12px;
    font-weight: 400;
    min-width: 56px;
    padding: 7px 0;
  }

  &.sm {
    font-size: 14px;
    font-weight: 500;
    min-width: 90px;
    padding: 7px 0;
  }

  &.md {
    font-size: 14px;
    font-weight: 500;
    min-width: 120px;
    padding: 8px 0;
  }

  &.lg {
    font-size: 14px;
    font-weight: 500;
    min-width: 322px;
    padding: 13px 0;
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

  :disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export default function Button({
  type,
  className,
  active = true,
  disabled = false,
  onClick,
  children,
}) {
  return (
    <StyledButton
      type={type}
      className={className}
      active={active}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
