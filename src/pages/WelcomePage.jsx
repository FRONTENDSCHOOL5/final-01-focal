import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import emailIcon from '../assets/icons/email.svg';
import signupIcon from '../assets/icons/icon-user-yellow.svg';
import kakao from '../assets/icons/kakao.svg';
import google from '../assets/icons/google.svg';
import facebook from '../assets/icons/facebook.svg';

const Container = styled.div`
  overflow-y: scroll;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeader = styled.header`
  flex-grow: 3;
  display: flex;
  align-items: center;
  & > h1 {
    width: 284px;
    & > img {
      width: 100%;
      margin-left: -6px;
    }
  }
`;

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-color);
  border-radius: 14px 14px 0px 0px;
  padding-top: 30px;

  & > section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 34px * 2);
    max-width: 322px;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  padding: 18px 0;
  border-radius: 4px;
  text-align: center;
  color: var(--sub-text-color);
  font-weight: 400;
  font-size: 14px;

  &:first-of-type {
    margin-bottom: 18px;
    background: var(--white) url(${emailIcon}) no-repeat 18px center / 24px;
  }
  &:last-of-type {
    margin-bottom: 35px;
    background: var(--white) url(${signupIcon}) no-repeat 18px center / 24px;
  }
`;

const SnsBtnContainer = styled.div`
  width: 215px;
  display: flex;

  & > button {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(2) {
      margin: 0 auto;
    }
  }
`;

export default function WelcomePage() {
  return (
    <Container>
      <StyledHeader>
        <h1>
          <span className="a11y-hidden">Focal 로고 버튼</span>
          <img src={Logo} alt="Focal 로고 이미지" />
        </h1>
      </StyledHeader>
      <Main>
        <section>
          <h2 className="a11y-hidden">로그인, 회원가입</h2>
          <StyledLink to="/login">이메일로 로그인</StyledLink>
          <StyledLink to="/signup">회원가입하기</StyledLink>
          <SnsBtnContainer>
            <button type="button">
              <img src={kakao} alt="카카오톡 계정으로 로그인" />
            </button>
            <button type="button">
              <img src={google} alt="구글 계정으로 로그인" />
            </button>
            <button type="button">
              <img src={facebook} alt="페이스북 계정으로 로그인" />
            </button>
          </SnsBtnContainer>
        </section>
      </Main>
    </Container>
  );
}
