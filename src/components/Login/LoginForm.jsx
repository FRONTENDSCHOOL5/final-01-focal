import React from 'react';
// import styled from 'styled-components';
import TextInput from '../Input/TextInput';

export default function LoginForm() {
  return (
    <div>
      <TextInput type="email" id="user-id">
        이메일
      </TextInput>
    </div>
  );
}
