import React from 'react';
import styled from 'styled-components';
import ProfileInputContainer from '../ProfileInputContainer/ProfileInputContainer';

const Form = styled.form`
  & > div:not(:last-child) {
    margin-bottom: 16px;
  }

  & > button {
    display: block;
    margin: 30px auto 0;
  }
`;

export default function ProfileForm() {
  return (
    <Form>
      <ProfileInputContainer />
      <button>포칼 시작하기</button>
    </Form>
  );
}
