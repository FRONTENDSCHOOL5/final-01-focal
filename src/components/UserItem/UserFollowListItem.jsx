import React from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';

const StyledLi = styled.li`
  display: flex;
  align-items: center;
`;

export default function UserFollowListItem({ user }) {
  return (
    <StyledLi>
      <UserInfo user={user} />
      <button>팔로우</button>
    </StyledLi>
  );
}
