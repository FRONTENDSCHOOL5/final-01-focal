import React from 'react';
import Header from '../components/Header/Header';
import ChatList from '../components/Chat/ChatList';

export default function ChatListPage() {
  return (
    <>
      <Header type="basic" />
      <ChatList />
    </>
  );
}
