import styled from 'styled-components';
import ChatItem from './ChatItem';
import { getDate } from '../../utils/getDate';

const ListMainStyle = styled.main`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: scroll;
  min-width: 390px;
  width: 100%;
  height: calc(100vh - 108px);
  background-color: var(--white);
`;

const MessagesListStyle = styled.ul`
  width: 100%;
  max-width: 390px;
`;

function ChatList({ list }) {
  return (
    <ListMainStyle>
      <h2 className="a11y-hidden">채팅 목록</h2>
      <MessagesListStyle>
        {list.map((item) => {
          return (
            <ChatItem
              key={item._id}
              accountname={item.accountname}
              imageSrc={item.image}
              username={item.username}
              chatdate={getDate()}
            />
          );
        })}
      </MessagesListStyle>
    </ListMainStyle>
  );
}

export default ChatList;
