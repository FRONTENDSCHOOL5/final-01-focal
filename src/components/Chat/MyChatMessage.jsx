import styled from 'styled-components';

const MyChatLogStyle = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 9px;
`;

const ChatDateStyle = styled.strong`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  align-self: flex-end;
  color: var(--sub-text-color);
  padding-right: 7px;
`;

function MyChatMessage({ time, children }) {
  return (
    <MyChatLogStyle>
      <ChatDateStyle>{time}</ChatDateStyle>
      {children}
    </MyChatLogStyle>
  );
}

export default MyChatMessage;
