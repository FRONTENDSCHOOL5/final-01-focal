import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
`;

const ProductCardWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px 25px;
  background-color: var(--white);
  border-radius: 10px;
  z-index: 100;
`;

const ProductImage = styled.img`
  width: 250px;
  height: 170px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
`;

const ProductName = styled.h3`
  font-size: 16px;
`;

const ProductTypeTag = styled.div`
  width: 40px;
  padding: 4px 0;
  font-size: 12px;
  color: var(--white);
  text-align: center;
  background-color: var(--main-color);
  border-radius: 4px;
`;

const ProductPrice = styled.strong`
  font-size: 14px;
  font-weight: bold;
  color: var(--main-color);
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 14px;
  border: 1px solid var(--border-color);
`;

const Button = styled.button`
  width: 126px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--main-color);
  padding: 14px 0;

  :first-child {
    border-right: 1px solid var(--border-color);
  }
`;

export default function ProductCard() {
  return (
    <Overlay>
      <ProductCardWrapper>
        <ProductImage></ProductImage>
        <ProductInfo>
          <ProductName>애월읍 노지 감귤</ProductName>
          <ProductTypeTag>필름</ProductTypeTag>
        </ProductInfo>
        <ProductPrice>35,000원</ProductPrice>
        <ButtonGroup>
          <Button>삭제</Button>
          <Button>수정</Button>
        </ButtonGroup>
      </ProductCardWrapper>
    </Overlay>
  );
}
