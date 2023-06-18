import React from 'react';
import styled from 'styled-components';

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button.attrs({ type: 'button' })`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  border-radius: 30px;
  padding: 8px 26px;
  border: 1px solid var(--border-color);
  background-color: transparent;
`;

export default function MyInfoBtns() {
  return (
    <BtnRow>
      <Button>프로필 수정</Button>
      <Button>상품 등록</Button>
    </BtnRow>
  );
}
