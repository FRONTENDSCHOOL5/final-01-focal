import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import ProfileInputContainer from '../components/ProfileInputContainer/ProfileInputContainer';

const Main = styled.main`
  width: 100%;
  margin-top: 48px;

  & > section {
    width: calc(100% - 34px * 2);
    max-width: 322px;
    margin: 48px auto;
    padding-top: 30px;

    & > div:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export default function ProfileEditPage() {
  return (
    <>
      <Header type="upload" />
      <Main>
        <section>
          <h2 className="a11y-hidden">
            프로필사진, 사용자이름, 계정ID, 자기소개 입력 컨테이너
          </h2>
          <ProfileInputContainer />
        </section>
      </Main>
    </>
  );
}
