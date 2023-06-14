import React from 'react';
import styled from 'styled-components';
import basicUserImg from '../../assets/images/basic-profile.png';
import chatIcon from '../../assets/icons/icon-message.svg';
import shareIcon from '../../assets/icons/icon-share.svg';
import { useState } from 'react';
import Button from '../Button/Button';

const UserBlock = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  width: 100%;
  background-color: var(--white);
  border-bottom: 0.5px solid var(--border-color);
`;

const UserInfoRow = styled.div`
  display: flex;
  gap: 41px;
`;

const FollowCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const FollowerNumber = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const FollowText = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: var(--sub-text-color);
`;

const FollowingNumber = styled.p`
  color: var(--sub-text-color);
  font-size: 18px;
  font-weight: 700;
`;

const UserImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

const UserName = styled.h2`
  margin: 16px 0 6px;
  font-size: 16px;
  font-weight: 700;
`;

const UserAccount = styled.p`
  font-size: 12px;
  color: var(--sub-text-color);
`;

const UserTitle = styled.h3`
  margin: 16px 0 24px;
  color: var(--sub-text-color);
  font-size: 16px;
`;

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

const BtnImage = styled.img``;

const UserProfileHeader = () => {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollowBtn = () => {
    setIsFollow(!isFollow);
    console.log('first');
  };

  return (
    <UserBlock>
      <UserInfoRow>
        <FollowCol>
          <FollowerNumber>2950</FollowerNumber>
          <FollowText>followers</FollowText>
        </FollowCol>
        <UserImage src={basicUserImg} alt="프로필 이미지" />
        <FollowCol>
          <FollowingNumber>128</FollowingNumber>
          <FollowText>followings</FollowText>
        </FollowCol>
      </UserInfoRow>
      <UserName>Focal</UserName>
      <UserAccount>@ focal_official</UserAccount>
      <UserTitle>당신의 필카를 공유하세요!</UserTitle>
      <BtnRow>
        <ProfileButton>
          <BtnImage src={chatIcon} alt="채팅 버튼" />
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
          <BtnImage src={shareIcon} alt="공유 버튼" />
        </ProfileButton>
      </BtnRow>
    </UserBlock>
  );
};

export default UserProfileHeader;
