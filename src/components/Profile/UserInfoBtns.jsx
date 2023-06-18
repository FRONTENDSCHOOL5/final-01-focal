import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { ReactComponent as ChatIcon } from '../../assets/icons/icon-message.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/icon-share.svg';

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ProfileButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background-color: transparent;
`;

export default function UserInfoBtns() {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollowBtn = () => {
    setIsFollow(!isFollow);
    console.log('first');
  };

  return (
    <BtnRow>
      <ProfileButton>
        <ChatIcon fill="none" stroke="black" alt="채팅버튼" />
      </ProfileButton>
      {isFollow ? (
        <Button onClick={handleFollowBtn} className="md" active={false}>
          언팔로우
        </Button>
      ) : (
        <Button onClick={handleFollowBtn} className="md">
          팔로우
        </Button>
      )}
      <ProfileButton>
        <ShareIcon alt="공유버튼" />
      </ProfileButton>
    </BtnRow>
  );
}
