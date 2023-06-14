import React from 'react';
import styled from 'styled-components';
import UserFollowListItem from '../components/UserItem/UserFollowListItem';
import FollowHeader from '../components/Header/FollowHeader';

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

export default function FollowersPage() {
  const user = { accountname: 'eunsu2201', username: '은수' };

  return (
    <>
      <FollowHeader>Followers</FollowHeader>
      <Main>
        <section>
          <h2 className="a11y-hidden">나를 팔로우하는 사람 리스트</h2>
          <ul>
            <UserFollowListItem user={user} />
            <UserFollowListItem user={user} />
          </ul>
        </section>
      </Main>
    </>
  );
}
