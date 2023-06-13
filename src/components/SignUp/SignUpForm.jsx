import React from 'react';
import TextInput from '../Input/TextInput';
import styled from 'styled-components';

const Form = styled.form`
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
export default function SignUpForm() {
  return (
    <Form>
      <TextInput
        id="email"
        type="email"
        placeholder="이메일 주소를 입력해주세요"
        // error="*이미 가입된 이메일 주소입니다."
      >
        이메일
      </TextInput>
      <TextInput
        id="password"
        type="password"
        placeholder="비밀번호를 설정해주세요"
        // error="*비밀번호는 6자 이상이어야 합니다."
      >
        비밀번호
      </TextInput>
      <button>다음</button>
    </Form>
  );
}
