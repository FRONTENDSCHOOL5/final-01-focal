import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import PostCard from '../components/Post/PostCard';
import BottomSheetModal from '../components/Modal/BottomSheetModal';
import BottomSheetContent from '../components/Modal/BottomSheetContent';
import ConfirmModal from '../components/Modal/ConfirmModal';
import authInstance from '../api/instance/authInstance';
import logo from '../assets/images/logo.png';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(postId);
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

  const openModal = () => {
    setIsMenuOpen(true);
    setIsModalOpen(true);
  };

  const handleReport = async (e) => {
    e.stopPropagation();
    try {
      const res = await authInstance.post(`/post/${postId}/report`);
      console.log(res);
      setIsMenuOpen(false);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageWrapper>
      <Header type="main" />
      <ContentWrapper>
        <Container>
          <h2 className="a11y-hidden">Focal 홈 피드</h2>

          {postDatas && postDatas.length > 0 ? (
            postDatas.map((data) => (
              <PostCard
                key={data.id}
                data={data}
                setIsMenuOpen={setIsMenuOpen}
                setPostId={setPostId}
              />
            ))
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
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={setIsMenuOpen}>
          <BottomSheetContent onClick={openModal}>신고</BottomSheetContent>
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="게시글을 신고하시겠어요?"
          confirmInfo="신고"
          setIsMenuOpen={setIsMenuOpen}
          setIsModalOpen={setIsModalOpen}
          onClick={handleReport}
        />
      )}
    </PageWrapper>
  );
}
