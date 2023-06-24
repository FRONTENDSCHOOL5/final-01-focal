import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import ChatRoom from '../components/Chat/ChatRoom';
import TextInputBox from '../components/Input/TextInputBox';
import authInstance from '../api/instance/authInstance';
import useModal from '../hooks/useModal';
import BottomSheetModal from '../components/Modal/BottomSheetModal';
import BottomSheetContent from '../components/Modal/BottomSheetContent';
import ConfirmModal from '../components/Modal/ConfirmModal';

export default function ChatRoomPage() {
  const { _id } = useParams();
  const [user, setUser] = useState(null);
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const navigate = useNavigate();

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
      <Header
        type="basic"
        ellipsisBtnShow={true}
        headerText={user?.username}
        onClick={() => openMenu()}
      />
      <h2 className="a11y-hidden">대화창</h2>
      <ChatRoom data={user?.username} />
      <TextInputBox type="chat" />
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          <BottomSheetContent onClick={() => openModal()}>
            채팅방 나가기
          </BottomSheetContent>
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="채팅방을 나가시겠어요?"
          confirmInfo="나가기"
          setIsMenuOpen={closeMenu}
          setIsModalOpen={closeModal}
          onClick={() => navigate('/chat')}
        />
      )}
    </>
  );
}
