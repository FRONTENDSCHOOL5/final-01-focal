import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/images/basic-profile-m.png';

const StyledUserInfo = styled(Link)`
  flex-grow: 1;
  display: flex;
  align-items: center;

  .userinfo-img {
    width: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }

  .userinfo-txt {
    margin-left: 12px;

    & > strong {
      color: black;
      font-weight: 500;
      font-size: 14px;

      & > .keyword {
        color: var(--main-color);
      }
    }

    & > p {
      font-weight: 400;
      font-size: 12px;
      color: var(--sub-text-color);
      margin-top: 6px;
    }
  }
`;

export default function UserInfo({ user, searchQuery = '' }) {
  const username = searchQuery
    ? user.username
    : user.username.replaceAll(
        searchQuery,
        `<span class="keyword">${searchQuery}</span>`,
      );

  return (
    <StyledUserInfo to={`/profile/${user.accountname}`}>
      <img
        className="userinfo-img"
        src={
          user.image === 'http://146.56.183.55:5050/Ellipse.png'
            ? defaultImg
            : user.image.replaceAll('mandarin.api', 'api.mandarin')
        }
        alt="유저이미지"
      />
      <div className="userinfo-txt">
        <strong dangerouslySetInnerHTML={{ __html: username }}></strong>
        <p>@ {user.accountname}</p>
      </div>
    </StyledUserInfo>
  );
}
