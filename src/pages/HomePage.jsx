import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import PostCard from '../components/Post/PostCard';
import authInstance from '../api/instance/authInstance';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 48px 0 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  gap: 20px;
`;

const Img = styled.img`
  width: 100px;
  filter: grayscale(90%);
`;

const Info = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function HomePage() {
  const [postDatas, setPostDatas] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await authInstance.get('/post/feed');
        setPostDatas(res.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  return (
    <PageWrapper>
      <Header type="main" />
      <ContentWrapper>
        <Container>
          <h2 className="a11y-hidden">Focal 홈 피드</h2>

          {postDatas && postDatas.length > 0 ? (
            postDatas.map((data) => <PostCard key={data.id} data={data} />)
          ) : (
            <>
              <Img src={logo} alt="Focal 로고" />
              <Info>유저를 검색해 팔로우 해보세요!</Info>
              <Button
                type="button"
                className="md"
                onClick={() => {
                  navigate('/search');
                }}
              >
                검색하기
              </Button>
            </>
          )}
        </Container>
      </ContentWrapper>
      <NavBar />
    </PageWrapper>
  );
}
