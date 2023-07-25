import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from '../Common/UserInfo/UserInfo';
import Button from '../Common/Button/Button';
import authInstance from '../../api/instance/authInstance';

const StyledLi = styled.li`
  display: flex;
  align-items: center;
`;

export default function UserFollowListItem({ user }) {
  const [isClicked, setIsClicked] = useState(user.isfollow);
  const accoutName = localStorage.getItem('accountname');

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
        accoutName != user.accountname && (
          <Button className="xs" onClick={handleFollowBtn}>
            팔로우
          </Button>
        )
      )}
    </StyledLi>
  );
}
