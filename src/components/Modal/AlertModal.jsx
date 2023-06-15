import styled from 'styled-components';

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

const AlertModal = ({
  title = '로그아웃하시겠어요?',
  confirmInfo = '로그아웃',
}) => {
  return (
    <Container>
      <h2 className="a11y-hidden">경고 메시지</h2>
      <ModalWrapper>
        <ModalTitle>{title}</ModalTitle>
        <ButtonsRow>
          <CancelButton>취소</CancelButton>
          <ConfirmButton>{confirmInfo}</ConfirmButton>
        </ButtonsRow>
      </ModalWrapper>
    </Container>
  );
};

export default AlertModal;
