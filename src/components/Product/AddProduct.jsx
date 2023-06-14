import styled from 'styled-components';
import InputField from './InputField';
import ImageUpload from './ImageUploda';

const ProductMainStyle = styled.main`
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

function AddProdcut() {
  return (
    <ProductMainStyle>
      <ProductSectionStyle>
        <ProductFormStyle>
          <ImageUpload label="이미지 등록" />
          <InputField
            labelText="상품명"
            inputId="productNameInput"
            inputType="text"
            inputPlaceholder="2~10자 이내여야 합니다."
            dataState="0"
          />

          <InputField
            labelText="가격"
            inputId="priceInput"
            inputType="number"
            inputPlaceholder="숫자만 입력 가능합니다."
            dataState="0"
          />

          <InputField
            labelText="판매 링크"
            inputId="storeLinkInput"
            inputType="url"
            inputPlaceholder="URL을 입력해 주세요."
            dataState="0"
          />
        </ProductFormStyle>
      </ProductSectionStyle>
    </ProductMainStyle>
  );
}

export default AddProdcut;
