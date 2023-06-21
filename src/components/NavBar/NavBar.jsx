import React from 'react';
import styled from 'styled-components';
import NavBarItem from './NavBarItem';
import { ReactComponent as HomeLink } from '../../assets/icons/icon-home.svg';
import { ReactComponent as ChatLink } from '../../assets/icons/icon-message.svg';
import { ReactComponent as PostLink } from '../../assets/icons/icon-edit.svg';
import { ReactComponent as ProfileLink } from '../../assets/icons/icon-user.svg';
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

const StyledHomeLink = styled(HomeLink)`
  stroke: ${({ pathname }) =>
    pathname === '/' ? 'var(--main-color)' : 'var(--sub-text-color)'};
  fill: ${({ pathname }) =>
    pathname === '/' ? 'var(--main-color)' : 'transparent'};

  path:nth-child(2) {
    stroke-width: ${({ pathname }) => (pathname === '/' ? '0.5' : '2')};
  }
`;

const StyledChatLink = styled(ChatLink)`
  stroke: ${({ pathname }) =>
    pathname === '/chat/' ? 'var(--main-color)' : 'var(--sub-text-color)'};
  fill: ${({ pathname }) =>
    pathname === '/chat/' ? 'var(--main-color)' : 'transparent'};
`;

const StyledProfileLink = styled(ProfileLink)`
  stroke: ${({ pathname }) =>
    pathname === '/profile/' ? 'var(--main-color)' : 'var(--sub-text-color)'};
  fill: ${({ pathname }) =>
    pathname === '/profile/' ? 'var(--main-color)' : 'transparent'};
`;

export default function NavBar() {
  const pathname = useLocation().pathname;

  return (
    <StyledNav>
      <ul>
        <li>
          <NavBarItem to="/" description="홈">
            <StyledHomeLink pathname={pathname} />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem to="/chat/" description="채팅">
            <StyledChatLink pathname={pathname} />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem to="/post/upload" description="게시물 작성">
            <PostLink pathname={pathname} />
          </NavBarItem>
        </li>
        <li>
          <NavBarItem to="/profile/" description="프로필">
            <StyledProfileLink pathname={pathname} />
          </NavBarItem>
        </li>
      </ul>
    </StyledNav>
  );
}
