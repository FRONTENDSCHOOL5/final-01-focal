import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import authInstance from '../api/instance/authInstance';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import PostCard from '../components/Post/PostCard';
import BottomSheetModal from '../components/Modal/BottomSheetModal';
import BottomSheetContent from '../components/Modal/BottomSheetContent';
import ConfirmModal from '../components/Modal/ConfirmModal';
import logo from '../assets/images/logo.png';

const ContentWrapper = styled.main`
  margin: 48px 0 0;
  height: calc(100vh - 108px);
  overflow-y: auto;
`;

const Container = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 20px;

  & > div {
    height: 100%;
  }
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
  const [isLoading, setIsLoading] = useState(true);
  const [postDatas, setPostDatas] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await authInstance.get('/post/feed');
        setPostDatas(res.data.posts);
        setIsLoading(false);
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
      await authInstance.post(`/post/${postId}/report`);
      setIsMenuOpen(false);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header type="main" />
      <ContentWrapper>
        <h2 className="a11y-hidden">Focal 홈 피드</h2>

        <Container>
          {isLoading ? (
            <span>로딩중</span>
          ) : postDatas && postDatas.length > 0 ? (
            <div>
              {postDatas.map((data) => (
                <PostCard
                  key={data.id}
                  post={data}
                  setIsMenuOpen={setIsMenuOpen}
                  setPostId={setPostId}
                />
              ))}
            </div>
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
    </>
  );
}
