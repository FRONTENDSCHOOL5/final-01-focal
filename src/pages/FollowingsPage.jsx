import React from 'react';
import styled from 'styled-components';
import UserFollowListItem from '../components/UserItem/UserFollowListItem';
import Header from '../components/Header/Header';
import { useEffect } from 'react';
import authInstance from '../api/instance/authInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoImg from '../assets/images/logo.png';
import Button from '../components/Button/Button';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 48px);
  overflow-y: auto;
  margin-top: 48px;

  & > section {
    max-width: 358px;
    width: calc(100% - 16px * 2);
    margin: 24px auto;

    & > ul li:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const FollowingNoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 108px);
  letter-spacing: 1.5px;
  gap: 20px;
`;

const LogoImg = styled.img`
  width: 150px;
  margin-bottom: 10px;
  filter: grayscale(90%);
`;

const FollowInfo = styled.h3`
  font-size: 22px;
`;

export default function FollowingsPage() {
  const location = useLocation();
  const accountname = location.state?.accountname;
  const username = location.state?.username;
  const [userData, setUserData] = useState([]);
  const loginAccountname = localStorage.getItem('accountname');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await authInstance.get(
        `/profile/${accountname}/following?limit=1000&skip=0`,
      );
      setUserData(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <Header type="follow" followText="Followings" />
      <Main>
        <section>
          <h2 className="a11y-hidden">내가 팔로우 하는 사람 리스트</h2>
          {userData.length > 0 ? (
            <ul>
              {userData.map((user) => (
                <UserFollowListItem key={user._id} user={user} />
              ))}
            </ul>
          ) : (
            <FollowingNoneWrapper>
              {loginAccountname === accountname ? (
                <>
                  <LogoImg src={logoImg} alt="포칼 로고" />
                  <FollowInfo>유저를 검색해 팔로우 해보세요!</FollowInfo>
                  <Button
                    type="button"
                    className="md"
                    onClick={() => {
                      navigate('/search');
                    }}
                  >
                    검색하기
                  </Button>
                </>
              ) : (
                <>
                  <LogoImg src={logoImg} alt="포칼 로고" />
                  <FollowInfo>{username} 가</FollowInfo>
                  <FollowInfo>팔로우 하는 사람이 없습니다!</FollowInfo>
                </>
              )}
            </FollowingNoneWrapper>
          )}
        </section>
      </Main>
    </>
  );
}
