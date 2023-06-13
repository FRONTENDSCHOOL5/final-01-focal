import React from 'react';
import styled from 'styled-components';
import NavBarItem from './NavBarItem';
import { ReactComponent as HomeLink } from '../../assets/icons/icon-home.svg';
import { ReactComponent as ChatLink } from '../../assets/icons/icon-message.svg';
import { ReactComponent as PostLink } from '../../assets/icons/icon-edit.svg';
import { ReactComponent as ProfileLink } from '../../assets/icons/icon-user.svg';

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 0 6px;
  border-top: 0.5px solid var(--border-color);

  ul {
    display: flex;
    justify-content: space-between;
  }
`;

export default function NavBar() {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavBarItem description="홈">
            <HomeLink stroke="#767676" />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem description="채팅">
            <ChatLink />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem description="게시물 작성">
            <PostLink />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem description="프로필">
            <ProfileLink />
          </NavBarItem>
        </li>
      </ul>
    </StyledNav>
  );
}
