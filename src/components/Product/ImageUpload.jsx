// ImageUpload.js
import styled from 'styled-components';
import ImageSrc from '../../assets/images/img-button.png';

const ImageContainerStyle = styled.div`
  margin-bottom: 48px;
`;

const ImageLabelStyle = styled.label`
  position: relative;
  display: block;
  width: 100%;
  height: 204px;
  background-color: #f2f2f2;
  border: 0.5 solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;

  &::after {
    position: absolute;
    right: 12px;
    bottom: 12px;
    content: '';
    width: 36px;
    height: 36px;
    background: #c4c4c4 url(${ImageSrc}) no-repeat center / 38px 38px;
    border-radius: 50%;
  }
`;

const ImageTitleStyle = styled.h3`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: var(--sub-text-color);
  margin-bottom: 18px;
`;

function ImageUpload({ label }) {
  return (
    <ImageContainerStyle>
      <ImageTitleStyle>{label}</ImageTitleStyle>
      <ImageLabelStyle htmlFor="productImg"></ImageLabelStyle>
    </ImageContainerStyle>
  );
}

export default ImageUpload;
