import React from 'react';
import styled from 'styled-components';
import basicUserImg from '../../assets/images/basic-profile.png';

const UserCol = styled.section`
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
  font-size: 16px;
  color: var(--sub-text-color);
  margin: 16px 0 24px;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button.attrs({ type: 'button' })`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  border-radius: 30px;
  padding: 8px 26px;
  border: 1px solid var(--border-color);
  background-color: transparent;
`;

const MyProfileHeader = () => {
  return (
    <UserCol>
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
      <UserName>애월읍 위니브 감귤농장</UserName>
      <UserAccount>@ weniv_Mandarin</UserAccount>
      <UserTitle>애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장</UserTitle>
      <BtnRow>
        <Button>프로필 수정</Button>
        <Button>상품 등록</Button>
      </BtnRow>
    </UserCol>
  );
};

export default MyProfileHeader;
