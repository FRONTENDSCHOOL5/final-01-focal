import styled from 'styled-components';
import ChatItem from './ChatItem';

const ListMainStyle = styled.main`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: scroll;
  min-width: 390px;
  width: 100%;
  height: 100%;
  background-color: var(--white);
`;

const MessagesListStyle = styled.ul`
  width: 100%;
  max-width: 390px;
`;

function ChatList() {
  return (
    <ListMainStyle>
      <MessagesListStyle>
        <ChatItem
          imageSrc="https://api.mandarin.weniv.co.kr//1687234600959.png"
          username="행복한 공주"
          chatdate="2023년 6월 6일"
        />
      </MessagesListStyle>
    </ListMainStyle>
  );
}

export default ChatList;
