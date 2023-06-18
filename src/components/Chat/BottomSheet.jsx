import styled from 'styled-components';

const UlStyle = styled.ul`
  height: auto;
  width: 100%;
  padding: 36px 0 16px;

  &::before {
    position: absolute;
    content: '';
    top: 16px;
    left: 50%;
    width: 50px;
    height: 4px;
    background-color: var(--border-color);
    border-radius: 5px;
    transform: translateX(-50%);
  }
`;

const ListStyle = styled.li`
  display: flex;
  align-items: center;
  padding-left: 26px;
`;

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 46px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

export default function BottomSheet() {
  return (
    <UlStyle>
      <ListStyle>
        <ButtonStyle>채팅방 나가기</ButtonStyle>
      </ListStyle>
    </UlStyle>
  );
}
