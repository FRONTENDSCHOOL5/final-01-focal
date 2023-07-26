import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import UserFollowListItem from '../components/Follow/UserFollowListItem';
import Header from '../layouts/Header/Header';
import logoImg from '../assets/images/logo.png';
import Loading from '../layouts/Loading/Loading';
import { followerAPI } from '../api/apis/follower';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 48px);
  overflow-y: auto;
  margin-top: 48px;

  & > section {
    padding: 24px 16px;

    & > ul li:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const FollowingNoneWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
  gap: 25px;
`;

const LogoImg = styled.img`
  width: 150px;
  filter: grayscale(90%);
`;

const FollowInfo = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function FollowersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const accountname = location.state?.accountname;
  const [userData, setUserData] = useState([]);
  const loginAccountname = localStorage.getItem('accountname');

  useEffect(() => {
    followerAPI(accountname).then((res) => {
      setUserData(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header type="basic" headerText="Followers" backBtnShow={true} />

      {isLoading ? (
        <Loading />
      ) : (
        <Main>
          <h2 className="a11y-hidden">나를 팔로우하는 유저 리스트</h2>
          {userData.length > 0 ? (
            <section>
              <ul>
                {userData.map((user) => (
                  <UserFollowListItem key={user._id} user={user} />
                ))}
              </ul>
            </section>
          ) : (
            <FollowingNoneWrapper>
              {loginAccountname === accountname ? (
                <>
                  <LogoImg src={logoImg} alt="포칼 로고" />
                  <FollowInfo>나를 팔로우하는 유저가 없습니다</FollowInfo>
                </>
              ) : (
                <>
                  <LogoImg src={logoImg} alt="포칼 로고" />
                  <FollowInfo>
                    @{accountname}님을 팔로우하는 유저가 없습니다
                  </FollowInfo>
                </>
              )}
            </FollowingNoneWrapper>
          )}
        </Main>
      )}
    </>
  );
}
