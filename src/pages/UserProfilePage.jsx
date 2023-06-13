import styled from 'styled-components';
import UserProfileHeader from '../components/Profile/UserProfileHeader';
import ProductsContainer from '../components/Profile/ProductsContainer';
import PostContainer from '../components/Profile/PostContainer';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 390px;
  background-color: #f2f2f2;
  gap: 6px;
`;

const UserProfilePage = () => {
  return (
    <Container>
      <UserProfileHeader />
      <ProductsContainer />
      <PostContainer />
    </Container>
  );
};
export default UserProfilePage;
