import React from 'react';
import styled from 'styled-components';
import NavBarItem from './NavBarItem';
import { ReactComponent as HomeIcon } from '../../assets/icons/icon-home.svg';
import { ReactComponent as ChatIcon } from '../../assets/icons/icon-message.svg';
import { ReactComponent as PostIcon } from '../../assets/icons/icon-edit.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/icon-user.svg';
import { useLocation } from 'react-router-dom';

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 0 6px;
  border-top: 0.5px solid var(--border-color);
  background-color: var(--white);

  ul {
    display: flex;
    justify-content: space-between;
  }
`;

export default function NavBar() {
  const location = useLocation();

  return (
    <StyledNav>
      <ul>
        <li>
          <NavBarItem
            to="/"
            description="홈"
            isActive={location.pathname === '/'}
          >
            <HomeIcon />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem
            to="/chat/"
            description="채팅"
            isActive={location.pathname === '/chat/'}
          >
            <ChatIcon />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem to="/post/upload" description="게시물 작성">
            <PostIcon />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem
            to="/profile/"
            description="프로필"
            isActive={location.pathname === '/profile/'}
          >
            <ProfileIcon />
          </NavBarItem>
        </li>
      </ul>
    </StyledNav>
  );
}
