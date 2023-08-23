import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layouts/Header/Header';
import ProductUpload from '../components/Product/ProductUpload';
import { getProductDetailAPI, editProductAPI } from '../api/apis/product';

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
    await editProductAPI(product_id, productData);
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
