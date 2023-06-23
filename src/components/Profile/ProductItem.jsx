import styled from 'styled-components';

const ProductItemWrapper = styled.li`
  cursor: pointer;
`;

const ProductInfo = styled.div`
  position: relative;
`;

const ProductImg = styled.img`
  width: 140px;
  height: 90px;
  min-width: 140px;
  border: 0.5px solid var(--border-color);
  border-radius: 8px;
  object-fit: cover;
  overflow: hidden;
`;

const ProductTypeTag = styled.div`
  position: absolute;
  right: 5px;
  bottom: 7px;
  width: 40px;
  padding: 4px 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--main-color);
  text-align: center;
  background-color: var(--white);
  border-radius: 4px;
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

export default function ProductItem({ product, onClick }) {
  return (
    <ProductItemWrapper onClick={onClick}>
      <ProductInfo>
        <ProductImg src={product.itemImage} alt="판매 상품 이미지" />
        <ProductTypeTag>{product.link}</ProductTypeTag>
      </ProductInfo>
      <ProductName>{product.itemName}</ProductName>
      <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
    </ProductItemWrapper>
  );
}
