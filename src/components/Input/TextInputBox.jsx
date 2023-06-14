import React, { useState } from 'react';
import styled from 'styled-components';
import profile from '../../assets/images/basic-profile-s.png';
import imageUpload from '../../assets/images/image-upload.png';

const InputBox = styled.form`
  /* position: fixed;
  bottom: 0; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-top: 1px solid var(--border-color);

  label {
    width: 36px;
    height: 36px;
  }

  label > img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  input {
    width: calc(100% - 100px);
  }
`;

const StyledButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${({ isActive }) =>
    isActive ? 'var(--main-color)' : 'var(--light-gray)'};
`;

export default function TextInputBox({ type }) {
  const [inputValue, setInputValue] = useState('');
  let isActive;
  let inputContent;
  inputValue ? (isActive = true) : (isActive = false);

  switch (type) {
    case 'comment':
      inputContent = (
        <>
          <img src={profile} alt="" />
          <label htmlFor="comment" className="a11y-hidden">
            댓글 입력
          </label>
          <input
            id="comment"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <StyledButton type="submit" isActive={isActive} disabled={!isActive}>
            게시
          </StyledButton>
        </>
      );
      break;
    case 'chat':
      inputContent = (
        <>
          <label htmlFor="image">
            <img src={imageUpload} alt="" />
          </label>
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
          />
          <StyledButton type="submit" isActive={isActive} disabled={!isActive}>
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
