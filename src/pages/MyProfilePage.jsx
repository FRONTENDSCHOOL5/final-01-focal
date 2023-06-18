import styled from 'styled-components';
import Header from '../components/Header/Header';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileProducts from '../components/Profile/ProfileProducts';
import ProfilePosts from '../components/Profile/ProfilePosts';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 390px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function MyProfilePage() {
  return (
    <Container>
      <Header type="basic" />
      <h1 className="a11y-hidden">나의 프로필 페이지</h1>
      <ProfileInfo />
      <ProfileProducts />
      <ProfilePosts />
    </Container>
  );
}
