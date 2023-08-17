import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const ModalContainer = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px 25px;
  background-color: var(--white);
  border-radius: 10px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h1 {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const Button = styled.button`
  display: block;
  width: 126px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--main-color);
  padding: 14px 0;
  margin: 14px auto 0;
  border: 1px solid var(--border-color);
`;

export default function SignupModal({ closeModal }) {
  return (
    <Overlay>
      <ModalContainer>
        <h1>회원가입이 완료되었습니다.</h1>
        <Button
          onClick={() => {
            closeModal();
          }}
        >
          확인
        </Button>
      </ModalContainer>
    </Overlay>
  );
}
