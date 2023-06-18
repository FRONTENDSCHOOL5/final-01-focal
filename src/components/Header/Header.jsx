import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as MoreButton } from '../../assets/icons/icon-more.svg';
import { ReactComponent as SearchButton } from '../../assets/icons/icon-search.svg';
import SearchInput from '../Input/SearchInput';
import IconButton from '../Button/IconButton';
import Button from '../Button/Button';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background-color: var(--white);
  border-bottom: 1px solid var(--border-color);

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h1,
  h2 {
    font-size: 14px;
    font-weight: 500;
  }
`;

export default function Header({ type, buttonId, buttonText, followText }) {
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
          <Button className="sm" formId={buttonId}>
            {buttonText}
          </Button>
        </>
      );
      break;
    case 'follow':
      headerContent = (
        <>
          <div>
            <IconButton>
              <BackButton />
            </IconButton>
            <h1>{followText}</h1>
          </div>
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
