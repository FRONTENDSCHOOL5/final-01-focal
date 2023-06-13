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
  }

  .userinfo-txt {
    margin-left: 12px;

    & > strong {
      color: black;
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 6px;
    }

    & > p {
      font-weight: 400;
      font-size: 12px;
      color: var(--sub-text-color);
    }
  }
`;

export default function UserInfo({ user }) {
  return (
    <StyledUserInfo to={`/profile/${user.accountname}`}>
      <img className="userinfo-img" src={defaultImg} alt="" />
      <div className="userinfo-txt">
        <strong>{user.username}</strong>
        <p>@ {user.accountname}</p>
      </div>
    </StyledUserInfo>
  );
}
