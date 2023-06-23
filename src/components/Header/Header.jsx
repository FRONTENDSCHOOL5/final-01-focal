import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as MoreButton } from '../../assets/icons/icon-more.svg';
import { ReactComponent as SearchButton } from '../../assets/icons/icon-search.svg';
import SearchInput from '../Input/SearchInput';
import IconButton from '../Button/IconButton';
import Button from '../Button/Button';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--white);
  z-index: 100;

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

const Logo = styled.h1`
  height: 36px;
  cursor: pointer;

  img {
    height: 100%;
    aspect-ratio: 2 / 1;
  }
`;

export default function Header({
  type,
  onClick,
  onChange,
  buttonId,
  buttonText,
  headerText,
  disabled,
  backBtnShow = true,
  ellipsisBtnShow = false,
}) {
  const navigate = useNavigate();
  let headerContent;
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const goSearchPage = () => {
    navigate('/search');
  };

  switch (type) {
    case 'basic':
      headerContent = (
        <>
          <div>
            {backBtnShow && (
              <IconButton>
                <BackButton onClick={goBack} />
              </IconButton>
            )}
            {headerText && <h1>{headerText}</h1>}
          </div>
          {ellipsisBtnShow && (
            <IconButton>
              <MoreButton onClick={onClick} />
            </IconButton>
          )}
        </>
      );
      break;
    case 'main':
      headerContent = (
        <>
          <Logo onClick={scrollToTop}>
            <img src={logo} alt="Focal 로고" />
          </Logo>
          <IconButton>
            <SearchButton onClick={goSearchPage} />
          </IconButton>
        </>
      );
      break;
    case 'search':
      headerContent = (
        <>
          <IconButton>
            <BackButton onClick={goBack} />
          </IconButton>
          <SearchInput onChange={onChange} />
        </>
      );

      break;
    case 'upload':
      headerContent = (
        <>
          <IconButton>
            <BackButton onClick={goBack} />
          </IconButton>
          <Button
            className="sm"
            formId={buttonId}
            onClick={onClick}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        </>
      );
      break;
    default:
      headerContent = null;
  }
  return <StyledHeader>{headerContent}</StyledHeader>;
}
