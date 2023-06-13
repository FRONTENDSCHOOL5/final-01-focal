import React from 'react';
import styled from 'styled-components';
import TextInput from '../Input/TextInput';

const Form = styled.form`
  margin-bottom: 20px;
  & > div:first-child {
    margin-bottom: 16px;
  }

  & > div:nth-child(2) {
    margin-bottom: 30px;
  }

  & > button {
    display: block;
    margin: 0 auto;
  }
`;

export default function LoginForm() {
  return (
    <Form>
      <TextInput id="user-id" type="email">
        이메일
      </TextInput>
      <TextInput
        id="password"
        type="password"
        // error="*비밀번호는 6자 이상이어야 합니다."
      >
        비밀번호
      </TextInput>
      <button>로그인</button>
    </Form>
  );
}
