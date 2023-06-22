import React, { useState } from 'react';
import Header from '../components/Header/Header';
import ProductUpload from '../components/Product/ProductUpload';
import authInstance from '../api/instance/authInstance';

export default function ProductUploadPage() {
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleValidChange = (isValid) => {
    setButtonDisable(!isValid);
  };

  const handleSubmit = async (productData) => {
    try {
      const productResponse = await authInstance.post('/product', productData);

      if (productResponse.status !== 200) {
        throw new Error('파일 업로드 에러');
      }
      console.log('상품 업로드 성공');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header
        type="upload"
        buttonId="product"
        buttonText="저장"
        disabled={buttonDisable}
      />
      <ProductUpload
        onValidChange={handleValidChange}
        handleSubmit={handleSubmit}
        inputValue={{}}
        setInputValue={() => {}}
      />
    </>
  );
}
