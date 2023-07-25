import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TitleHeader from '../layouts/Header/TitleHeader';
import LoginForm from '../components/Login/LoginForm';

const Main = styled.main`
  width: 100%;

  & > section {
    max-width: 322px;
    width: calc(100% - 34px * 2);
    margin: 0 auto;

    & > .signup-link {
      font-weight: 400;
      font-size: 12px;
      color: var(--sub-text-color);
      display: block;
      width: 100%;
      text-align: center;
    }
  }
`;

export default function LoginPage() {
  return (
    <>
      <TitleHeader>로그인</TitleHeader>
      <Main>
        <section>
          <h2 className="a11y-hidden">이메일, 비밀번호 입력</h2>
          <LoginForm />
          <Link to="/signup" className="signup-link">
            이메일로 회원가입
          </Link>
        </section>
      </Main>
    </>
  );
}
