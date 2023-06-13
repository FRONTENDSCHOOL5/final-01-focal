import React from 'react';
import styled from 'styled-components';
import UserFollowListItem from '../components/UserItem/UserFollowListItem';

const Main = styled.main`
  width: 100%;

  & > section {
    max-width: 358px;
    width: calc(100% - 16px * 2);
    margin: 24px auto;

    & > ul li:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export default function FollowingsPage() {
  const user = { accountname: 'eunsu2201', username: '은수' };

  return (
    <>
      <header>
        <h1>Followings</h1>
      </header>
      <Main>
        <section>
          <h2 className="a11y-hidden">팔로우 리스트</h2>
          <ul>
            <UserFollowListItem user={user} />
            <UserFollowListItem user={user} />
          </ul>
        </section>
      </Main>
    </>
  );
}
