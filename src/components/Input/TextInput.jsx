import React from 'react';
import styled from 'styled-components';

const TextInputBox = styled.div`
  label {
    font-weight: 500;
    font-size: 12px;
    color: #767676;
  }

  input {
    border: 0;
    outline: none;
    border-bottom: 1px solid #dbdbdb;
    display: block;
    width: 100%;
    height: 32px;
  }

  input:focus {
    border-color: #f26e22;
  }

  p {
    margin-top: 6px;
    font-weight: 400;
    font-size: 12px;
    color: #eb5757;
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
