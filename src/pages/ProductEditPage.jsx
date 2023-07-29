import React, { useEffect, useState } from 'react';
import Header from '../layouts/Header/Header';
import ProductUpload from '../components/Product/ProductUpload';
import authInstance from '../api/instance/authInstance';
import { useParams } from 'react-router-dom';
import { getProductDetailAPI } from '../api/apis/product';

export default function ProductEditPage() {
  const { product_id } = useParams();
  const [inputValue, setInputValue] = useState({
    itemImage: '',
    itemType: '',
    itemName: '',
    price: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const product = await getProductDetailAPI(product_id);

      setInputValue({
        itemImage: product.itemImage,
        itemType: product.link,
        itemName: product.itemName,
        price: product.price,
      });
    };
    getData();
  }, []);

  const handleEditSubmit = async (productData) => {
    try {
      const productResponse = await authInstance.put(
        `/product/${product_id}`,
        productData,
      );

      if (productResponse.status !== 200) {
        throw new Error('파일 업로드 에러');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header type="upload" buttonId="product" buttonText="저장" />
      <ProductUpload
        handleEditSubmit={handleEditSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isEditMode={true}
      />
    </>
  );
}
