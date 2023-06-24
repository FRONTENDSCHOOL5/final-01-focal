import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import ChatRoom from '../components/Chat/ChatRoom';
import TextInputBox from '../components/Input/TextInputBox';
import authInstance from '../api/instance/authInstance';

export default function ChatRoomPage() {
  const { _id } = useParams();
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await authInstance.get(
        `/user/searchuser/?keyword=${_id}`,
      );
      const findUser = response.data.find((user) => user.accountname === _id);
      setUser(findUser);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [_id]);

  return (
    <>
      <Header type="basic" ellipsisBtnShow={true} headerText={user?.username} />
      <h2 className="a11y-hidden">대화창</h2>
      <ChatRoom />
      <TextInputBox type="chat" />
    </>
  );
}
