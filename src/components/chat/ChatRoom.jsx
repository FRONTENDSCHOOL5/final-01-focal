import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import MyChatMessage from './MyChatMessage';
import SendText from './SendText';
import SendImage from './SendImage';
import ReceiveText from './ReceiveText';
import ReceiveImage from './ReceiveImage';
import ImageSrc from '../../assets/images/Ellipse-1.png';
import ImageSrc2 from '../../assets/images/chat-exapmle.png';
import ImageSrc3 from '../../assets/images/post-img-example.png';

const MainStyle = styled.main`
  position: fixed;
  min-width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ChatWrapperStyle = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 16px;
  min-height: 100%;
`;

const MessageListStyle = styled.div`
  padding: 0;
  margin: 0;
  overflow: auto;
`;

function ChatRoom() {
  return (
    <MainStyle>
      <ChatWrapperStyle>
        <MessageListStyle>
          <ChatMessage imgSrc={ImageSrc} time="12:22">
            <ReceiveText message="옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 악동하다. 대고,못할 넣는 풍부하게 뛰노는 인생의 힘있다." />
          </ChatMessage>
          <ChatMessage imgSrc={ImageSrc} time="12:25">
            <ReceiveText message="안녕하세요. 감귤 사고싶어요요요요요" />
          </ChatMessage>
          <ChatMessage imgSrc={ImageSrc} time="12:30">
            <ReceiveImage src={ImageSrc3} />
          </ChatMessage>
          <MyChatMessage time="12:50">
            <SendText message="네 말씀하세요." />
          </MyChatMessage>
          <MyChatMessage time="12:51">
            <SendImage src={ImageSrc2} />
          </MyChatMessage>
        </MessageListStyle>
      </ChatWrapperStyle>
    </MainStyle>
  );
}

export default ChatRoom;
