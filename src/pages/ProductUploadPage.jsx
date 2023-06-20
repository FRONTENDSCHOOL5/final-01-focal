import React, { useState } from 'react';
import Header from '../components/Header/Header';
import ProductUpload from '../components/Product/ProductUpload';

export default function ProductUploadPage() {
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleValidChange = (isValid) => {
    setButtonDisable(!isValid);
  };
  return (
    <>
      <Header
        type="upload"
        buttonId="product"
        buttonText="저장"
        disabled={buttonDisable}
      />
      <ProductUpload onValidChange={handleValidChange} />
    </>
  );
}
