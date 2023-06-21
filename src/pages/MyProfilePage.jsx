import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import authInstance from '../api/instance/authInstance';
import Header from '../components/Header/Header';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileProducts from '../components/Profile/ProfileProducts';
import ProfilePosts from '../components/Profile/ProfilePosts';
import NavBar from '../components/NavBar/NavBar';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 390px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function MyProfilePage() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await authInstance.get('user/myinfo');
        const { user } = res.data;
        setUserData(user);
      } catch (err) {
        console.error('Error :', err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Container>
      <Header type="basic" />
      <h1 className="a11y-hidden">나의 프로필 페이지</h1>
      {userData && (
        <>
          <ProfileInfo userInfo={userData} />
          <ProfileProducts accountname={userData.accountname} />
          <ProfilePosts accountname={userData.accountname} />
        </>
      )}
      <NavBar />
    </Container>
  );
}
