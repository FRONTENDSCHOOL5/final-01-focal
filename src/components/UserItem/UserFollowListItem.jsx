import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import Button from '../Button/Button';
import authInstance from '../../api/instance/authInstance';

const StyledLi = styled.li`
  display: flex;
  align-items: center;
`;

export default function UserFollowListItem({ user }) {
  const [isClicked, setIsClicked] = useState(user.isfollow);

  const handleFollowBtn = () => {
    authInstance.post(`/profile/${user.accountname}/follow`, {
      profile: { isfollow: isClicked },
    });
    setIsClicked(!isClicked);
  };

  const handleCancelBtn = () => {
    authInstance.delete(`/profile/${user.accountname}/unfollow`);
    setIsClicked(!isClicked);
  };

  return (
    <StyledLi>
      <UserInfo user={user} />
      {isClicked ? (
        <Button className="xs" active={false} onClick={handleCancelBtn}>
          취소
        </Button>
      ) : (
        <Button className="xs" onClick={handleFollowBtn}>
          팔로우
        </Button>
      )}
    </StyledLi>
  );
}
