import styled from 'styled-components';
import basicUserImg from '../../assets/images/basic-profile.png';
import UserInfoBtns from './UserInfoBtns';
import MyInfoBtns from './MyInfoBtns';

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

export default function ProfileInfo({ user }) {
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
      <UserName>Focal</UserName>
      <UserAccount>@ focal_official</UserAccount>
      <UserTitle>당신의 필카를 공유하세요!</UserTitle>
      {user ? <UserInfoBtns /> : <MyInfoBtns />}
    </UserCol>
  );
}
