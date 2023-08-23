import styled from 'styled-components';

const Container = styled.section`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const ModalWrapper = styled.div`
  width: 252px;
  background: var(--white);
  border-radius: 10px;
`;

const ModalTitle = styled.strong`
  display: block;
  padding: 22px 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
`;

const ButtonsRow = styled.div`
  display: flex;
  width: 100%;
  border-top: 0.5px solid var(--border-color);
`;

const CancelButton = styled.button`
  width: 100%;
  height: 46px;
  font-weight: 400;
  font-size: 14px;
  width: 50%;
  line-height: 18px;
`;

const ConfirmButton = styled.button`
  width: 50%;
  border-left: 0.5px solid var(--border-color);
  color: var(--main-color);
`;

export default function ConfirmModal({
  title,
  confirmInfo,
  setIsMenuOpen,
  setIsModalOpen,
  onClick,
}) {
  const closeModal = () => {
    setIsMenuOpen(false);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <h2 className="a11y-hidden">경고 메시지</h2>
      <ModalWrapper>
        <ModalTitle>{title}</ModalTitle>
        <ButtonsRow>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <ConfirmButton onClick={onClick}>{confirmInfo}</ConfirmButton>
        </ButtonsRow>
      </ModalWrapper>
    </Container>
  );
}
