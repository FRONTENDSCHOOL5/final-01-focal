import styled from 'styled-components';
import ChatItem from './ChatItem';
import imageSrc from '../../assets/images/basic-profile-s.png';

const ListMainStyle = styled.main`
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: scroll;
  min-width: 390px;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  margin-top: 48px;
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
          imageSrc={imageSrc}
          username="김민교"
          chatdate="2023년 6월 6일"
        />
        <ChatItem
          imageSrc={imageSrc}
          username="정유송"
          chatdate="2023년 6월 8일"
        />
        <ChatItem
          imageSrc={imageSrc}
          username="신은수"
          chatdate="2023년 6월 8일"
        />
      </MessagesListStyle>
    </ListMainStyle>
  );
}

export default ChatList;
