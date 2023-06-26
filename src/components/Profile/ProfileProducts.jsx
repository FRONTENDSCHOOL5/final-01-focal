import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import authInstance from '../../api/instance/authInstance';
import ProductItem from './ProductItem';
import ProductCard from '../Product/ProductCard';
import ConfirmModal from '../Modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';

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
  padding: 20px 16px;
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

export default function ProfileProducts({ accountname }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isCurrentUser = accountname === localStorage.getItem('accountname');

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

  const deleteProduct = async () => {
    try {
      await authInstance.delete(`/product/${selectedProduct.id}`);
      setIsMenuOpen(false);
      setIsModalOpen(false);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedProduct.id),
      );
    } catch (err) {
      console.error('Error :', err);
    }
  };

  const getProductIndex = (index) => {
    setSelectedProduct(products[index]);
  };

  const openCard = () => {
    setIsMenuOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {products.length > 0 && (
        <ProductsCol>
          <ProductsWrapper>
            <Title>판매 중인 상품</Title>
            <ProductList>
              {products.map((product, index) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onClick={() => {
                    getProductIndex(index);
                    openCard();
                  }}
                />
              ))}
            </ProductList>
          </ProductsWrapper>
          {isMenuOpen && (
            <ProductCard
              product={selectedProduct}
              setIsMenuOpen={setIsMenuOpen}
              handleDelete={openModal}
              handleUpdate={() =>
                navigate(`/product/${selectedProduct.id}/edit`)
              }
              isCurrentUser={isCurrentUser}
            />
          )}
          {isCurrentUser && isModalOpen && (
            <ConfirmModal
              title="상품을 삭제할까요?"
              confirmInfo="삭제"
              onClick={deleteProduct}
              setIsMenuOpen={setIsMenuOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </ProductsCol>
      )}
    </>
  );
}
