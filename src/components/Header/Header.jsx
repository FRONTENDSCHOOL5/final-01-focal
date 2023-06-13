import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as MoreButton } from '../../assets/icons/icon-more.svg';
import { ReactComponent as SearchButton } from '../../assets/icons/icon-search.svg';
import SearchInput from '../Input/SearchInput';
import IconButton from '../Button/IconButton';
import Button from '../Button/Button';

const StyledHeader = styled.header`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);

  h1 {
    font-size: 18px;
  }

  h2 {
    font-size: 14px;
  }
`;

export default function Header({ type }) {
  let headerContent;

  switch (type) {
    case 'basic':
      headerContent = (
        <>
          <IconButton>
            <BackButton />
          </IconButton>
          <IconButton>
            <MoreButton />
          </IconButton>
        </>
      );
      break;
    case 'main':
      headerContent = (
        <>
          <h1>피드</h1>
          <IconButton>
            <SearchButton />
          </IconButton>
        </>
      );
      break;
    case 'search':
      headerContent = (
        <>
          <IconButton>
            <BackButton />
          </IconButton>
          <SearchInput />
        </>
      );

      break;
    case 'upload':
      headerContent = (
        <>
          <IconButton>
            <BackButton />
          </IconButton>
          <Button className="sm">저장</Button>
        </>
      );
      break;
    case 'chat':
      headerContent = (
        <>
          <IconButton>
            <BackButton />
          </IconButton>
          <h2>애월읍 위니브 감귤 농장</h2>
          <IconButton>
            <MoreButton />
          </IconButton>
        </>
      );
      break;
    default:
      headerContent = null;
  }
  return <StyledHeader>{headerContent}</StyledHeader>;
}
