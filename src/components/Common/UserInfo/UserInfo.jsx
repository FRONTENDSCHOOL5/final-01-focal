import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getProperImgSrc } from '../../../utils/getProperImgSrc';
import { handleImageError } from '../../../utils/handleImageError';

const StyledUserInfo = styled(Link)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;

  .userinfo-img {
    width: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }

  .userinfo-txt {
    width: 100%;
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
      width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
`;

export default function UserInfo({ user, searchQuery = null }) {
  const searchUserName = user.username.replaceAll(
    searchQuery,
    `<span class="keyword">${searchQuery}</span>`,
  );

  return (
    <StyledUserInfo to={`/profile/${user.accountname}`}>
      <img
        className="userinfo-img"
        src={getProperImgSrc(user.image)}
        onError={handleImageError}
        alt="유저이미지"
      />
      <div className="userinfo-txt">
        {searchQuery ? (
          <strong dangerouslySetInnerHTML={{ __html: searchUserName }}></strong>
        ) : (
          <strong>{user.username}</strong>
        )}
        <p>@ {user.accountname}</p>
      </div>
    </StyledUserInfo>
  );
}
