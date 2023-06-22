import styled from 'styled-components';
import ImageSrc from '../../assets/images/image-upload.png';

const ImageContainerStyle = styled.div`
  margin-bottom: 30px;
`;

const ImageLabelStyle = styled.label`
  position: relative;
  display: block;
  width: 100%;
  height: 204px;
  background-color: #f2f2f2;
  border: 0.5px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  background-image: ${(props) => `url(${props.imagePreview})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::after {
    position: absolute;
    right: 12px;
    bottom: 12px;
    content: '';
    width: 36px;
    height: 36px;
    background: var(--main-color) url(${ImageSrc}) no-repeat center / 39px 39px;
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

const ImageInputStyle = styled.input`
  display: none;
`;

function ImageUpload({ title, onImageChange, imagePreview }) {
  return (
    <ImageContainerStyle>
      <ImageTitleStyle>{title}</ImageTitleStyle>
      <ImageLabelStyle htmlFor="productImg" imagePreview={imagePreview}>
        <ImageInputStyle
          type="file"
          id="productImg"
          onChange={onImageChange}
          accept=".jpg,.jpeg,.png,.gif,.bmp,.tif,.heic"
          name="image"
        />
      </ImageLabelStyle>
    </ImageContainerStyle>
  );
}

export default ImageUpload;
