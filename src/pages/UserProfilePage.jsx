import styled from 'styled-components';
import UserProfileHeader from '../components/Profile/UserProfileHeader';
import ProductsContainer from '../components/Profile/ProductsContainer';
import PostContainer from '../components/Profile/PostContainer';
import Header from '../components/Header/Header';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 390px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

const UserProfilePage = () => {
  return (
    <Container>
      <Header type="basic" />
      <h1 className="a11y-hidden">나의 프로필 페이지</h1>
      <UserProfileHeader />
      <ProductsContainer />
      <PostContainer />
    </Container>
  );
};
export default UserProfilePage;
