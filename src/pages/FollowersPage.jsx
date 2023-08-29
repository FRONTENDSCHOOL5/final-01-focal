import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserFollowListItem from '../components/Follow/UserFollowListItem';
import Header from '../layouts/Header/Header';
import Loading from '../layouts/Loading/Loading';
import { followerAPI } from '../api/apis/follow';
import FollowNone from '../components/Follow/FollowNone';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import useScrollBottom from '../hooks/useScrollBottom';

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
  const location = useLocation();
  const accountname = location.state?.accountname;
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const elementRef = useRef(null);
  const isBottom = useScrollBottom(elementRef);
  const limit = 12;
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (isBottom) {
      setSkip((PrevValue) => PrevValue + limit);
      fetchFollowers(skip + limit);
    }
  }, [isBottom]);

  const fetchFollowers = async (skip) => {
    try {
      const res = await followerAPI(accountname, limit, skip);
      if (skip === 0) {
        setUserData(res);
      } else {
        setUserData((prevData) => [...prevData, ...res]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowers(skip);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Header type="basic" headerText="Followers" backBtnShow={true} />
      <Main ref={elementRef}>
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
