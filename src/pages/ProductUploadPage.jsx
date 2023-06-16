import React from 'react';
import Header from '../components/Header/Header';
import ProductUpload from '../components/Product/ProductUpload';

export default function ProductUploadPage() {
  return (
    <>
      <Header type="upload" />
      <ProductUpload />
    </>
  );
}
