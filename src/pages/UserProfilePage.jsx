import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
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

export default function UserProfilePage() {
  const { _id } = useParams();
  const [userData, setUserData] = useState('');

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

  return (
    <>
      <Header type="basic" />
      <Container>
        <h1 className="a11y-hidden">나의 프로필 페이지</h1>
        {userData && (
          <>
            <ProfileInfo userInfo={userData} isUser={_id} />
            <ProfileProducts accountname={userData.accountname} />
            <ProfilePosts accountname={userData.accountname} isUser={_id} />
          </>
        )}
        <NavBar />
      </Container>
    </>
  );
}
