import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import TextInput from '../Input/TextInput';

const ProductMainStyle = styled.main`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  min-width: 390px;
  width: 100%;
  height: 100%;
  background-color: #fff;
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
`;

const InputContainerStyle = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

function ProductUpload() {
  return (
    <ProductMainStyle>
      <ProductSectionStyle>
        <ProductFormStyle>
          <ImageUpload title="이미지 등록" />
          <InputContainerStyle>
            <TextInput
              id="priceInput"
              type="text"
              placeholder="2~10자 이내여야 합니다."
            >
              상품명
            </TextInput>
          </InputContainerStyle>

          <InputContainerStyle>
            <TextInput
              id="productNameInput"
              type="number"
              placeholder="숫자만 입력 가능합니다."
            >
              가격
            </TextInput>
          </InputContainerStyle>

          <InputContainerStyle>
            <TextInput
              id="storeLinkInput"
              type="url"
              placeholder="URL을 입력해 주세요."
            >
              판매링크
            </TextInput>
          </InputContainerStyle>
        </ProductFormStyle>
      </ProductSectionStyle>
    </ProductMainStyle>
  );
}

export default ProductUpload;
