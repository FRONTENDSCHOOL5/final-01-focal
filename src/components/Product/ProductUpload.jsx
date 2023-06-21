import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import TextInput from '../Input/TextInput';
import authInstance from '../../api/instance/authInstance';
import baseInstance from '../../api/instance/baseInstance';
import RadioInput, { RadioInputGroup } from '../Input/RadioInput';

const ProductMainStyle = styled.main`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  min-width: 390px;
  width: 100%;
  height: 100%;
  background-color: var(--white);
`;

const ProductSectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  width: 100%;
  padding: 30px 34px 0px;
`;

const ProductFormStyle = styled.form`
  width: 100%;
  & > div:not(:first-child) {
    margin-bottom: 16px;
  }
`;

function ProductUpload({ onValidChange }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [displayPrice, setDisplayPrice] = useState('');
  const [productType, setProductType] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handlePriceChange = (e) => {
    const numericPrice = e.target.value.replace(/[^0-9]/g, '');
    setPrice(numericPrice);

    if (numericPrice) {
      const formattedPrice = numericPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setDisplayPrice(formattedPrice);
    } else {
      setDisplayPrice('');
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageFormData = new FormData();
      imageFormData.append('image', image);

      const imageResponse = await baseInstance.post(
        '/image/uploadfile',
        imageFormData,
      );

      if (imageResponse.status !== 200) {
        throw new Error('이미지 파일 업로드 에러');
      }

      const filename = imageResponse.data.filename;

      const productData = {
        product: {
          itemName: name,
          price: Number(price),
          link: productType,
          itemImage: filename,
        },
      };

      const productResponse = await authInstance.post('/product', productData);

      if (productResponse.status !== 200) {
        throw new Error('파일 업로드 에러');
      }

      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const isSaveButtonDisabled =
    !name ||
    name.length < 2 ||
    name.length > 15 ||
    !price ||
    Number(price) <= 0 ||
    !image ||
    !productType;

  useEffect(() => {
    onValidChange(!isSaveButtonDisabled);
  }, [name, price, image, productType, onValidChange]);
  return (
    <ProductMainStyle>
      <ProductSectionStyle>
        <ProductFormStyle id="product" onSubmit={handleSubmit}>
          <ImageUpload
            title="이미지 등록"
            onImageChange={handleImageChange}
            imagePreview={imagePreview}
          />
          <RadioInputGroup title={'상품종류'}>
            <RadioInput
              id="film"
              value="film"
              checked={productType === 'film'}
              onChange={(e) => setProductType(e.target.value)}
            >
              필름
            </RadioInput>
            <RadioInput
              id="camera"
              value="camera"
              checked={productType === 'camera'}
              onChange={(e) => setProductType(e.target.value)}
            >
              카메라
            </RadioInput>
          </RadioInputGroup>
          <TextInput
            id="productNameInput"
            type="text"
            placeholder="2~15자 이내여야 합니다."
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            상품명
          </TextInput>
          <TextInput
            id="priceInput"
            type="text"
            placeholder="숫자만 입력 가능합니다."
            value={displayPrice}
            onChange={handlePriceChange}
          >
            가격
          </TextInput>
        </ProductFormStyle>
      </ProductSectionStyle>
    </ProductMainStyle>
  );
}

export default ProductUpload;
