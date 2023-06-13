import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../assets/images/basic-profile.png';
import fileUploadImg from '../../assets/images/profile-upload.png';

const StyledLabel = styled.label`
  display: block;
  width: 110px;
  height: 110px;
  margin: 0 auto 30px;
  position: relative;
  cursor: pointer;

  & > img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  &::after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url(${fileUploadImg}) no-repeat center;
  }
`;

export default function ProfileImageUploader() {
  return (
    <>
      <StyledLabel htmlFor="image">
        <img src={defaultImg} alt="선택한 이미지 미리보기" />
      </StyledLabel>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className="a11y-hidden"
      />
    </>
  );
}
