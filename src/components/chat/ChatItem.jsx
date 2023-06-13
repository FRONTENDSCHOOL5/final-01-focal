import styled from 'styled-components';

const ChatItemStyle = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const UserNameStyle = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin: 2px 0 4px 0;
`;

const ChatDateStyle = styled.strong`
  position: absolute;
  right: 0;
  bottom: 3px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: var(--sub-text-color);
`;

const UesrImageStyle = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 10px;
`;

export default function ChatItem({ imageSrc, username, chatdate }) {
  return (
    <ChatItemStyle>
      <UesrImageStyle src={imageSrc} alt="이미지" />
      <UserNameStyle>{username}</UserNameStyle>
      <ChatDateStyle>{chatdate}</ChatDateStyle>
    </ChatItemStyle>
  );
}
