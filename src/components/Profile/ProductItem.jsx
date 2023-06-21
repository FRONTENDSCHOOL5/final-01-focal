import styled from 'styled-components';

const ProductItemWrapper = styled.li`
  cursor: pointer;
`;

const ProductImg = styled.img`
  height: 90px;
  min-width: 140px;
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

export default function ProductItem({ product }) {
  return (
    <ProductItemWrapper
      onClick={() => {
        window.open(product.link);
      }}
    >
      <ProductImg src={product.itemImage} alt="판매 상품 이미지" />
      <ProductName>{product.itemName}</ProductName>
      <ProductPrice>{product.price.toLocaleString()}</ProductPrice>
    </ProductItemWrapper>
  );
}
