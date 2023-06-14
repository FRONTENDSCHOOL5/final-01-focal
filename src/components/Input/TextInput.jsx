import React from 'react';
import styled from 'styled-components';

const TextInputBox = styled.div`
  label {
    font-weight: 500;
    font-size: 12px;
    color: var(--sub-text-color);
  }

  input {
    border: 0;
    outline: none;
    border-bottom: 1px solid var(--border-color);
    display: block;
    width: 100%;
    height: 32px;

    &::placeholder {
      color: var(--border-color);
      font-weight: 400;
      font-size: 14px;
    }

    &:focus {
      border-color: var(--main-color);
    }
  }

  p {
    margin-top: 6px;
    font-weight: 400;
    font-size: 12px;
    color: var(--red);
  }
`;

export default function TextInput({
  id,
  type = 'text',
  children,
  placeholder = '',
  error = '',
}) {
  return (
    <TextInputBox>
      <label htmlFor={id}>{children}</label>
      <input type={type} id={id} placeholder={placeholder} />
      {error && <p>{error}</p>}
    </TextInputBox>
  );
}
