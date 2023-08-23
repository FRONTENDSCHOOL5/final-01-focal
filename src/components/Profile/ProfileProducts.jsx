import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import ProductCard from '../Product/ProductCard';
import ConfirmModal from '../../layouts/Modal/ConfirmModal';
import useModal from '../../hooks/useModal';
import { getProductListAPI, deleteProductAPI } from '../../api/apis/product';

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

export default function ProfileProducts({ accountname, setIsProductLoading }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const navigate = useNavigate();
  const isCurrentUser = accountname === localStorage.getItem('accountname');

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductListAPI(accountname);
      setProducts(products);
      setIsProductLoading(false);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async () => {
    await deleteProductAPI(selectedProduct.id);
    closeMenu();
    closeModal();

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== selectedProduct.id),
    );
  };

  const getProductIndex = (index) => {
    setSelectedProduct(products[index]);
  };

  const handleCardClick = () => {
    openMenu();
  };

  const handleProductUpdate = () => {
    navigate(`/product/${selectedProduct.id}/edit`);
  };

  return (
    <>
      {products.length > 0 ? (
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
                    handleCardClick();
                  }}
                />
              ))}
            </ProductList>
          </ProductsWrapper>
        </ProductsCol>
      ) : null}
      {isMenuOpen && (
        <ProductCard
          product={selectedProduct}
          setIsMenuOpen={closeMenu}
          handleDelete={openModal}
          handleUpdate={handleProductUpdate}
          isCurrentUser={isCurrentUser}
        />
      )}
      {isCurrentUser && isModalOpen && (
        <ConfirmModal
          title="상품을 삭제할까요?"
          confirmInfo="삭제"
          onClick={deleteProduct}
          setIsMenuOpen={closeMenu}
          setIsModalOpen={closeModal}
        />
      )}
    </>
  );
}
