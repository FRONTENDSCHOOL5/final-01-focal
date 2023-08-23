import React from 'react';
import Header from '../layouts/Header/Header';
import ChatList from '../components/Chat/ChatList';
import NavBar from '../layouts/NavBar/NavBar';

export default function ChatListPage() {
  return (
    <>
      <Header type="basic" backBtnShow={false} headerText={'내 채팅방'} />
      <ChatList />
      <NavBar />
    </>
  );
}
