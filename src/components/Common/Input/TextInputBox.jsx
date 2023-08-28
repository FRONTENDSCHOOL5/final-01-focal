import React, { useState } from 'react';
import styled from 'styled-components';
import profile from '../../../assets/images/basic-profile.png';
import imageUpload from '../../../assets/images/image-upload.png';

const InputBox = styled.form`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background-color: var(--white);
  border-top: 1px solid var(--border-color);

  input {
    width: calc(100% - 100px);
  }

  input::placeholder {
    color: var(--light-gray);
  }
`;

const StyledLabel = styled.label`
  width: 36px;
  height: 36px;
  cursor: pointer;

  > img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const StyledButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${({ isActive }) =>
    isActive ? 'var(--main-color)' : 'var(--light-gray)'};
`;

export default function TextInputBox({ type, onButtonClick }) {
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  let isActive;
  let inputContent;
  inputValue ? (isActive = true) : (isActive = false);

  const image = localStorage.getItem('image');
  const profileImage =
    image === 'http://146.56.183.55:5050/Ellipse.png'
      ? profile
      : image.replaceAll('mandarin.api', 'api.mandarin');

  const handleButtonClick = () => {
    onButtonClick(inputValue);
    setInputValue('');
  };

  switch (type) {
    case 'comment':
      inputContent = (
        <>
          <StyledLabel htmlFor="image">
            <img id="image" src={profileImage} alt="프로필 이미지" />
          </StyledLabel>
          <label htmlFor="comment" className="a11y-hidden">
            댓글 입력
          </label>
          <input
            id="chat"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e) => {
              if (!isComposing && e.key === 'Enter') {
                e.preventDefault();
                if (inputValue === '') return;
                handleButtonClick();
              }
            }}
            autoComplete="off"
            placeholder="댓글 입력하기..."
          />
          <StyledButton
            type="button"
            isActive={isActive}
            disabled={!isActive}
            onClick={handleButtonClick}
          >
            게시
          </StyledButton>
        </>
      );
      break;
    case 'chat':
      inputContent = (
        <>
          <StyledLabel htmlFor="image">
            <img src={imageUpload} alt="이미지 업로드 버튼" />
          </StyledLabel>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="a11y-hidden"
          />
          <label htmlFor="chat" className="a11y-hidden">
            채팅 입력
          </label>
          <input
            id="chat"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e) => {
              if (!isComposing && e.key === 'Enter') {
                e.preventDefault();
                if (inputValue === '') return;
                handleButtonClick();
              }
            }}
            autoComplete="off"
          />
          <StyledButton
            type="button"
            isActive={isActive}
            disabled={!isActive}
            onClick={handleButtonClick}
          >
            전송
          </StyledButton>
        </>
      );
      break;
    default:
      inputContent = null;
  }

  return <InputBox>{inputContent}</InputBox>;
}
