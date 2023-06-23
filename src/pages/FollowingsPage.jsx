import React from 'react';
import styled from 'styled-components';
import UserFollowListItem from '../components/UserItem/UserFollowListItem';
import Header from '../components/Header/Header';
import { useEffect } from 'react';
import authInstance from '../api/instance/authInstance';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

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
  justify-content: center;
  align-items: center;
  height: calc(100vh - 108px);
  letter-spacing: 1.5px;

  & > h3 {
    font-size: 23px;
  }
`;

export default function FollowingsPage() {
  const location = useLocation();
  const accountname = location.state?.accountname;
  const [userData, setUserData] = useState([]);

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
              <h3>내가 팔로우 하는 사람이 없습니다!</h3>
            </FollowingNoneWrapper>
          )}
        </section>
      </Main>
    </>
  );
}
