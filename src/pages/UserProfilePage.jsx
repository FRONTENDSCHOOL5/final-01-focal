import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../states/LoginState';
import authInstance from '../api/instance/authInstance';
import Header from '../components/Header/Header';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileProducts from '../components/Profile/ProfileProducts';
import ProfilePosts from '../components/Profile/ProfilePosts';
import NavBar from '../components/NavBar/NavBar';
import BottomSheetModal from '../components/Modal/BottomSheetModal';
import BottomSheetContent from '../components/Modal/BottomSheetContent';
import ConfirmModal from '../components/Modal/ConfirmModal';

const Container = styled.main`
  & > main {
    width: 100%;
    height: calc(100vh - 108px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 390px;
    margin-top: 48px;
    background-color: #f2f2f2;
    gap: 6px;
  }
`;

export default function UserProfilePage() {
  const { _id } = useParams();
  const [userData, setUserData] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const setIsLogined = useSetRecoilState(loginState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await authInstance.get(`profile/${_id}`);
        const { profile } = res.data;
        setUserData(profile);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, [userData.isfollow]);

  const onClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsMenuOpen(true);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountname');
    localStorage.removeItem('image');
    setIsLogined(false);
  };

  return (
    <>
      <Container>
        <Header type="basic" onClick={onClick} />
        <main>
          <h1 className="a11y-hidden">나의 프로필 페이지</h1>
          {userData && (
            <>
              <ProfileInfo userInfo={userData} />
              <ProfileProducts accountname={userData.accountname} />
              <ProfilePosts accountname={userData.accountname} />
            </>
          )}
        </main>
        <NavBar />
      </Container>

      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={setIsMenuOpen}>
          <BottomSheetContent
            onClick={() => {
              navigate('/profile/edit');
            }}
          >
            설정 및 개인정보
          </BottomSheetContent>
          <BottomSheetContent onClick={openModal}>로그아웃</BottomSheetContent>
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="로그아웃하시겠어요?"
          confirmInfo="로그아웃"
          setIsMenuOpen={setIsMenuOpen}
          setIsModalOpen={setIsModalOpen}
          onClick={handleLogout}
        />
      )}
    </>
  );
}
