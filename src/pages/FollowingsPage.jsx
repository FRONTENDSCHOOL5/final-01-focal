import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import UserFollowListItem from '../components/UserItem/UserFollowListItem';
import Header from '../components/Header/Header';
import authInstance from '../api/instance/authInstance';
import Button from '../components/Button/Button';
import Loading from '../components/Loading/Loading';
import logoImg from '../assets/images/logo.png';

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

export default function FollowingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const accountname = location.state?.accountname;
  const [userData, setUserData] = useState([]);
  const loginAccountname = localStorage.getItem('accountname');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await authInstance.get(
        `/profile/${accountname}/following?limit=1000&skip=0`,
      );
      setUserData(res.data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <Header type="basic" headerText="Followings" backBtnShow={true} />(
      {isLoading ? (
        <Loading />
      ) : (
        <Main>
          <h2 className="a11y-hidden">내가 팔로우 하는 사람 리스트</h2>
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
                  <FollowInfo>
                    @{accountname}님이 팔로우 하는 유저가 없습니다
                  </FollowInfo>
                </>
              )}
            </FollowingNoneWrapper>
          )}
        </Main>
      )}
      )
    </>
  );
}
