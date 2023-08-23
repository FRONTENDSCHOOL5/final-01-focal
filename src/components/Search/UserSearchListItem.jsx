import React from 'react';
import styled from 'styled-components';
import UserInfo from '../Common/UserInfo/UserInfo';

const StyledLi = styled.li`
  display: flex;

  & > a {
    width: 100%;
  }
`;

export default function UserSearchListItem({ user, searchQuery }) {
  return (
    <StyledLi>
      <UserInfo user={user} searchQuery={searchQuery} />
    </StyledLi>
  );
}
