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

  ul {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledHomeLink = styled(HomeLink)`
  stroke: ${(props) =>
    props.pathname === '/' ? 'var(--main-color)' : 'var(--sub-text-color)'};
  fill: ${(props) =>
    props.pathname === '/' ? 'var(--main-color)' : 'transparent'};

  path:nth-child(2) {
    stroke-width: ${(props) => (props.pathname === '/' ? '0.5' : '2')};
  }
`;

const StyledChatLink = styled(ChatLink)`
  stroke: ${(props) =>
    props.pathname === '/chat/'
      ? 'var(--main-color)'
      : 'var(--sub-text-color)'};
  fill: ${(props) =>
    props.pathname === '/chat/' ? 'var(--main-color)' : 'transparent'};
`;

const StyledProfileLink = styled(ProfileLink)`
  stroke: ${(props) =>
    props.pathname === '/profile/'
      ? 'var(--main-color)'
      : 'var(--sub-text-color)'};
  fill: ${(props) =>
    props.pathname === '/profile/' ? 'var(--main-color)' : 'transparent'};
`;

export default function NavBar() {
  const pathname = useLocation().pathname;
  console.log(pathname);

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
