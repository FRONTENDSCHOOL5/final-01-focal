import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button/Button';

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
`;

export default function MyInfoBtns() {
  const navigate = useNavigate();
  return (
    <BtnRow>
      <Button
        onClick={() => {
          navigate(`/profile/edit`);
        }}
        className="md"
        active={false}
      >
        프로필 수정
      </Button>
      <Button
        onClick={() => {
          navigate(`/product`);
        }}
        className="md"
        active={false}
      >
        상품 등록
      </Button>
    </BtnRow>
  );
}
