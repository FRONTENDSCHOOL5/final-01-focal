import styled from 'styled-components';
import MyProfileHeader from '../components/Profile/MyProfileHeader';
import ProductsContainer from '../components/Profile/ProductsContainer';
import PostContainer from '../components/Profile/PostContainer';
import Header from '../components/Header/Header';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 390px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function MyProfilePage() {
  return (
    <Container>
      <Header type="basic" />
      <MyProfileHeader />
      <ProductsContainer />
      <PostContainer />
    </Container>
  );
}
