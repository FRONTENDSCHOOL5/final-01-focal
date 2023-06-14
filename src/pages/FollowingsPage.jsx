import React from 'react';
import styled from 'styled-components';
import UserFollowListItem from '../components/UserItem/UserFollowListItem';
import { ReactComponent as BackButton } from '../assets/icons/icon-arrow-left.svg';
import IconButton from '../components/Button/IconButton';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);

  & > h1 {
    margin-left: 8px;
    font-size: 14px;
  }
`;

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 108px);
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

export default function FollowingsPage() {
  const user = { accountname: 'eunsu2201', username: '은수' };

  return (
    <>
      <StyledHeader>
        <IconButton>
          <BackButton />
        </IconButton>
        <h1>Followings</h1>
      </StyledHeader>

      <Main>
        <section>
          <h2 className="a11y-hidden">팔로잉 리스트</h2>
          <ul>
            <UserFollowListItem user={user} />
            <UserFollowListItem user={user} />
            <UserFollowListItem user={user} />
            <UserFollowListItem user={user} />
            <UserFollowListItem user={user} />
            <UserFollowListItem user={user} />
          </ul>
        </section>
      </Main>
    </>
  );
}
