import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import UserFollowListItem from '../components/Follow/UserFollowListItem';
import Header from '../layouts/Header/Header';
import Loading from '../layouts/Loading/Loading';
import { followerAPI } from '../api/apis/follow';
import FollowNone from '../components/Follow/FollowNone';

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

export default function FollowersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const accountname = location.state?.accountname;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await followerAPI(accountname);
      setUserData(res);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <Header type="basic" headerText="Followers" backBtnShow={true} />
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
          <FollowNone type="follower" accountname={accountname} />
        )}
      </Main>
    </>
  );
}
