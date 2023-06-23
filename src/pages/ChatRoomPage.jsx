import React from 'react';
import Header from '../components/Header/Header';
import ChatRoom from '../components/Chat/ChatRoom';
import TextInputBox from '../components/Input/TextInputBox';

export default function ChatRoomPage() {
  return (
    <>
      <Header
        type="basic"
        ellipsisBtnShow={true}
        headerText={'애월읍 위니브 감귤농장'}
      />
      <h2 className="a11y-hidden">대화창</h2>
      <ChatRoom />
      <TextInputBox type="chat" />
    </>
  );
}
