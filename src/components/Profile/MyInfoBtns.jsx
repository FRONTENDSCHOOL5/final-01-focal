import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
    <BtnRow>
      <Button
        onClick={() => {
          navigate(`/profile/edit`);
        }}
      >
        프로필 수정
      </Button>
      <Button
        onClick={() => {
          navigate(`/product`);
        }}
      >
        상품 등록
      </Button>
    </BtnRow>
  );
}
