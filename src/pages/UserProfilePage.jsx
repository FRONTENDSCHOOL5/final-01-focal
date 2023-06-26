import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import authInstance from '../api/instance/authInstance';
import Header from '../components/Header/Header';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileProducts from '../components/Profile/ProfileProducts';
import ProfilePosts from '../components/Profile/ProfilePosts';
import NavBar from '../components/NavBar/NavBar';
import Loading from '../components/Loading/Loading';

const Main = styled.main`
  width: 100%;
  max-height: calc(100vh - 108px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 390px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function UserProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const { _id } = useParams();
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await authInstance.get(`profile/${_id}`);
        const { profile } = res.data;
        setUserData(profile);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, [userData.isfollow]);

  return (
    <>
      {isLoading && isProductLoading && isPostLoading ? (
        <Loading />
      ) : (
        <Main>
          <Header type="basic" />
          <main>
            <h1 className="a11y-hidden">나의 프로필 페이지</h1>
            {userData && (
              <>
                <ProfileInfo userInfo={userData} />
                <ProfileProducts
                  accountname={userData.accountname}
                  setIsProductLoading={setIsProductLoading}
                />
                <ProfilePosts
                  accountname={userData.accountname}
                  setIsPostLoading={setIsPostLoading}
                />
              </>
            )}
          </main>
          <NavBar />
        </Main>
      )}
    </>
  );
}
