import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import authInstance from '../../api/instance/authInstance';
import NavBar from '../NavBar/NavBar';
import ProductItem from './ProductItem';

const ProductsCol = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  border-top: 0.5px solid var(--border-color);
  border-bottom: 0.5px solid var(--border-color);
`;

const ProductsWrapper = styled.div`
  padding: 20px 0 20px 16px;
  max-width: 390px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ProductList = styled.ul`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export default function ProfileProducts({ accountname = '' }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await authInstance.get(`/product/${accountname}`);
        setProducts(res.data.product);
      } catch (error) {
        console.error('Error :', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {products.length > 0 && (
        <ProductsCol>
          <ProductsWrapper>
            <Title>판매 중인 상품</Title>
            <ProductList>
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ProductList>
          </ProductsWrapper>
        </ProductsCol>
      )}
      <NavBar />
    </>
  );
}
