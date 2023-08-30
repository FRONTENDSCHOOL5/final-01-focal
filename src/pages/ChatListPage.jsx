import { useEffect, useState } from 'react';
import Header from '../layouts/Header/Header';
import ChatList from '../components/Chat/ChatList';
import NavBar from '../layouts/NavBar/NavBar';
import { followingAPI } from '../api/apis/follow';

export default function ChatListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const accountname = localStorage.getItem('accountname');

  const getFollowingList = async () => {
    setIsLoading(true);

    try {
      const response = await followingAPI(accountname);

      if (response.length === 0) return;

      setFollowingList(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFollowingList();
  }, [accountname]);
  return (
    <>
      <Header type="basic" backBtnShow={false} headerText={'내 채팅방'} />
      {!isLoading && <ChatList list={followingList} />}
      <NavBar />
    </>
  );
}
