import styled from 'styled-components';
import logo from '../assets/images/basic-profile.png';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 10px;
  gap: 20px;
`;

const Img = styled.img`
  width: 100px;
`;

const Info = styled.p`
  font-size: 14px;
  color: var(--sub-text-color);
`;

const HomePage = () => {
  return (
    <Container>
      <Header type="main" />
      <Img src={logo} alt="감귤 마켓 로고" />
      <Info>유저를 검색해 팔로우 해보세요!</Info>
      <Button type="button" className="md">
        검색하기
      </Button>
    </Container>
  );
};

export default HomePage;
