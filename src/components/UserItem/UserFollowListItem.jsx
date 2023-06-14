import React from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import Button from '../Button/Button';

const StyledLi = styled.li`
  display: flex;
  align-items: center;
`;

export default function UserFollowListItem({ user }) {
  return (
    <StyledLi>
      <UserInfo user={user} />
      <Button className="xs">팔로우</Button>
    </StyledLi>
  );
}
