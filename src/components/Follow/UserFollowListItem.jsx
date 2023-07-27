import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from '../Common/UserInfo/UserInfo';
import Button from '../Common/Button/Button';
import { followAPI, unfollowAPI } from '../../api/apis/follow';

const StyledLi = styled.li`
  display: flex;
  align-items: center;
`;

export default function UserFollowListItem({ user }) {
  const [isClicked, setIsClicked] = useState(user.isfollow);
  const accoutName = localStorage.getItem('accountname');

  const handleFollowBtn = () => {
    followAPI(user.accountname, isClicked);
    setIsClicked(!isClicked);
  };

  const handleCancelBtn = () => {
    unfollowAPI(user.accountname);
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
