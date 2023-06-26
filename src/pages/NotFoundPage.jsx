import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import notFoundImage from '../assets/images/not-found.png';

const Container = styled.section`
  display: flex;
  height: calc(100vh - 150px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const Img = styled.img`
  width: 200px;
  filter: grayscale(90%);
`;

const Info = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <Img src={notFoundImage} alt="오류 이미지" />
      <Info>페이지를 찾을 수 없습니다. :&#40;</Info>
      <Button
        type="button"
        className="md"
        onClick={() => {
          navigate(-1);
        }}
      >
        이전 페이지
      </Button>
    </Container>
  );
}
