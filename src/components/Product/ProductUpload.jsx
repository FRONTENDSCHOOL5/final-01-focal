import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import TextInput from '../Common/Input/TextInput';
import RadioInput, { RadioInputGroup } from '../Common/Input/RadioInput';
import { getImageSrc } from '../../api/apis/image';

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

function ProductUpload({
  onValidChange,
  handleSubmit,
  handleEditSubmit,
  inputValue,
  setInputValue,
  isEditMode,
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [displayPrice, setDisplayPrice] = useState('');
  const [itemType, setItemType] = useState(inputValue.itemType);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    inputValue.itemImage || null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setItemType(inputValue.itemType);
  }, [inputValue.itemType]);

  useEffect(() => {
    if (inputValue.itemName && inputValue.price) {
      setName(inputValue.itemName);
      setDisplayPrice(inputValue.price);
    }
  }, [inputValue.itemName]);

  const handlePriceChange = (e) => {
    const numericPrice = e.target.value.replace(/[^0-9]/g, '');
    setPrice(numericPrice);

    if (numericPrice) {
      const formattedPrice = numericPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        price: Number(numericPrice),
      }));
      setDisplayPrice(formattedPrice);
    } else {
      setDisplayPrice('');
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        price: 0,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        itemImage: file,
      }));
    } else {
      setImagePreview(null);
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        itemImage: '',
      }));
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    let itemImage = inputValue.itemImage;

    if (image) {
      const { filename } = await getImageSrc(image);
      itemImage = `${process.env.REACT_APP_BASE_URL}${filename}`;
    }

    const productData = {
      product: {
        itemName: name || inputValue.itemName,
        price: Number(price) || inputValue.price,
        link: itemType || inputValue.itemType,
        itemImage: itemImage,
      },
    };

    if (isEditMode) {
      await handleEditSubmit(productData);
    } else {
      await handleSubmit(productData);
    }

    navigate('/profile');
  };

  const isSaveButtonDisabled =
    !name ||
    name.length < 2 ||
    name.length > 15 ||
    !price ||
    Number(price) <= 0 ||
    !image ||
    !itemType;

  useEffect(() => {
    if (onValidChange && !isEditMode) {
      onValidChange(!isSaveButtonDisabled);
    }
  }, [name, price, image, itemType, onValidChange]);

  useEffect(() => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      price: displayPrice !== '' ? displayPrice : prevInputValue.price,
    }));
  }, [displayPrice, setInputValue]);

  return (
    <ProductMainStyle>
      <ProductSectionStyle>
        <ProductFormStyle id="product" onSubmit={handleImageSubmit}>
          <ImageUpload
            title="이미지 등록"
            onImageChange={handleImageChange}
            value={image}
            imagePreview={imagePreview || inputValue.itemImage}
          />
          <RadioInputGroup title={'상품종류'}>
            <RadioInput
              id="film"
              value="필름"
              checked={itemType === '필름'}
              onChange={(e) => setItemType(e.target.value)}
            >
              필름
            </RadioInput>
            <RadioInput
              id="camera"
              value="카메라"
              checked={itemType === '카메라'}
              onChange={(e) => setItemType(e.target.value)}
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
