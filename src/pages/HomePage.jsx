import styled from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import logo from '../assets/images/basic-profile.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 16px 0;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
`;

const Img = styled.img`
  width: 100px;
`;

const Info = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function HomePage() {
  return (
    <>
      <Header type="main" />
      <Container>
        <h2 className="a11y-hidden">Focal 홈 피드</h2>
        <MainContainer>
          <Img src={logo} alt="감귤 마켓 로고" />
          <Info>유저를 검색해 팔로우 해보세요!</Info>
          <Button type="button" className="md">
            검색하기
          </Button>
        </MainContainer>
      </Container>
    </>
  );
}
