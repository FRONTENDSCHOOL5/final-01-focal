import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button/Button';
import { ReactComponent as ShareIcon } from '../../assets/icons/icon-share.svg';
import { ReactComponent as ChatIcon } from '../../assets/icons/icon-message.svg';
import { followAPI } from '../../api/apis/follow';
import { unfollowAPI } from '../../api/apis/unfollow';

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

export default function UserInfoBtns({
  handleFollowNum,
  isFollow,
  accountname,
}) {
  const [getFollow, setGetFollow] = useState(isFollow);
  const navigate = useNavigate();

  const handleFollowBtn = () => {
    followAPI(accountname, isFollow);
    setGetFollow(!getFollow);
    handleFollowNum(getFollow);
  };

  const handleUnfollowBtn = () => {
    unfollowAPI(accountname);
    setGetFollow(!getFollow);
    handleFollowNum(getFollow);
  };

  return (
    <BtnRow>
      <ProfileButton
        onClick={() => {
          navigate(`/chat/${accountname}`);
        }}
      >
        <ChatIcon fill="none" stroke="black" aria-hidden={true} role="img">
          <desc id="desc">채팅버튼</desc>
        </ChatIcon>
      </ProfileButton>
      {getFollow ? (
        <Button onClick={handleUnfollowBtn} className="md" active={false}>
          언팔로우
        </Button>
      ) : (
        <Button onClick={handleFollowBtn} className="md">
          팔로우
        </Button>
      )}
      <ProfileButton>
        <ShareIcon aria-hidden={true} role="img">
          <desc id="desc">공유버튼</desc>
        </ShareIcon>
      </ProfileButton>
    </BtnRow>
  );
}
