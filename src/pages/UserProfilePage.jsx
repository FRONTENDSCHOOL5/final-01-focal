import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { profileAPI } from '../api/apis/profile';
import Header from '../layouts/Header/Header';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileProducts from '../components/Profile/ProfileProducts';
import ProfilePosts from '../components/Profile/ProfilePosts';
import NavBar from '../layouts/NavBar/NavBar';
import Loading from '../layouts/Loading/Loading';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

const Main = styled.main`
  width: 100%;
  max-height: calc(100vh - 108px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 380px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function UserProfilePage() {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [userData, setUserData] = useState('');
  const { _id } = useParams();

  const elementRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await profileAPI(_id);
      setUserData(res);
      setIsUserLoading(false);
    };
    fetchUserData();
  }, []);

  return (
    <>
      {(isUserLoading || isProductLoading || isPostLoading) && <Loading />}
      {!(isUserLoading && isProductLoading && isPostLoading) && (
        <>
          <Header type="basic" />
          <Main ref={elementRef}>
            <h1 className="a11y-hidden">
              ${userData.accountname}의 프로필 페이지
            </h1>
            {userData && (
              <>
                <ProfileInfo userInfo={userData} />
                <ProfileProducts
                  accountname={userData.accountname}
                  setIsProductLoading={setIsProductLoading}
                />
                <ProfilePosts
                  elementRef={elementRef}
                  accountname={userData.accountname}
                  setIsPostLoading={setIsPostLoading}
                />
              </>
            )}
          </Main>
          <NavBar />
        </>
      )}
    </>
  );
}
