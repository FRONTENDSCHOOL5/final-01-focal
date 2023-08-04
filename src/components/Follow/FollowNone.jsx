import styled from 'styled-components';
import Button from '../Common/Button/Button';
import logoImg from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const FollowNoneWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
  gap: 25px;
`;

const LogoImg = styled.img`
  width: 150px;
  filter: grayscale(90%);
`;

const FollowInfo = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function FollowNone({ accountname, type }) {
  const loginAccountname = localStorage.getItem('accountname');
  const navigate = useNavigate();

  let myFollowNoneContent;
  let userFollowNoneContent;

  switch (type) {
    case 'follwer':
      myFollowNoneContent = (
        <>
          <FollowInfo>나를 팔로우하는 유저가 없습니다</FollowInfo>
        </>
      );
      userFollowNoneContent = (
        <>
          <FollowInfo>@{accountname}님을 팔로우하는 유저가 없습니다</FollowInfo>
        </>
      );
      break;
    case 'following':
      myFollowNoneContent = (
        <>
          <FollowInfo>유저를 검색해 팔로우 해보세요!</FollowInfo>
          <Button
            type="button"
            className="md"
            onClick={() => {
              navigate('/search');
            }}
          >
            검색하기
          </Button>
        </>
      );
      userFollowNoneContent = (
        <>
          <FollowInfo>
            @{accountname}님이 팔로우 하는 유저가 없습니다
          </FollowInfo>
        </>
      );
      break;
  }
  return (
    <FollowNoneWrapper>
      <LogoImg src={logoImg} alt="포칼 로고" />
      {loginAccountname === accountname
        ? myFollowNoneContent
        : userFollowNoneContent}
    </FollowNoneWrapper>
  );
}
