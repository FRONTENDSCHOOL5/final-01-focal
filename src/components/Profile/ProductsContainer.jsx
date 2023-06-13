import React from 'react';
import styled from 'styled-components';
import basicSaleImg from '../../assets/images/profile-upload.png';

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
  overflow-x: auto;
  overflow-y: hidden;
`;

const ProductItem = styled.li`
  cursor: pointer;
`;

const ProductImg = styled.img`
  height: 90px;
  border: 0.5px solid var(--border-color);
  border-radius: 8px;
  object-fit: cover;
  overflow: hidden;
`;

const ProductName = styled.strong`
  display: block;
  margin-bottom: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

const ProductPrice = styled.strong`
  font-weight: 700;
  font-size: 12px;
  color: #f26e22;
`;
const ProductsContainer = () => {
  return (
    <ProductsCol>
      <ProductsWrapper>
        <Title>판매 중인 상품</Title>
        <ProductList>
          <ProductItem>
            <ProductImg src={basicSaleImg} />
            <ProductName>앗</ProductName>
            <ProductPrice>99,999,999</ProductPrice>
          </ProductItem>
          <ProductItem>
            <ProductImg src={basicSaleImg} />
            <ProductName>앗</ProductName>
            <ProductPrice>99,999,999</ProductPrice>
          </ProductItem>
          <ProductItem>
            <ProductImg src={basicSaleImg} />
            <ProductName>앗</ProductName>
            <ProductPrice>99,999,999</ProductPrice>
          </ProductItem>
        </ProductList>
      </ProductsWrapper>
    </ProductsCol>
  );
};

export default ProductsContainer;
