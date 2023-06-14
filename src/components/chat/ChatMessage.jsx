import styled from 'styled-components';

const ChatLogStyle = styled.section`
  position: relative;
  display: flex;
  margin-bottom: 9px;
`;

export const UserImageStyle = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 10px;
`;

const ChatDateStyle = styled.strong`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  align-self: flex-end;
  color: var(--border-color);
  padding: 7px 7px 0px 7px;
`;

function ChatMessage({ imgSrc, time, children }) {
  return (
    <>
      <ChatLogStyle>
        <UserImageStyle src={imgSrc} alt="이미지" />
        {children}
        <ChatDateStyle>{time}</ChatDateStyle>
      </ChatLogStyle>
    </>
  );
}

export default ChatMessage;
