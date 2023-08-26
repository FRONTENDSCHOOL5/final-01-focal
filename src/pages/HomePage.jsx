import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button/Button';
import Header from '../layouts/Header/Header';
import NavBar from '../layouts/NavBar/NavBar';
import PostCard from '../components/Common/PostCard/PostCard';
import BottomSheetModal from '../layouts/Modal/BottomSheetModal';
import BottomSheetContent from '../layouts/Modal/BottomSheetContent';
import ConfirmModal from '../layouts/Modal/ConfirmModal';
import useModal from '../hooks/useModal';
import logo from '../assets/images/logo.png';
import Loading from '../layouts/Loading/Loading';
import { reportPostAPI } from '../api/apis/post';
import { feedAPI } from '../api/apis/post';

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
  padding: 16px;
  gap: 20px;

  & > div {
    height: 100%;
    & > article {
      padding-bottom: 40px;
    }
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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [postDatas, setPostDatas] = useState([]);
  const [postId, setPostId] = useState(null);
  const [page, setPage] = useState(1);
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const LIMIT_VALUE = 10;

  useEffect(() => {
    const getInitialPosts = async () => {
      const res = await feedAPI(LIMIT_VALUE, 0);
      setPostDatas(res.data.posts);
      setIsLoading(false);
    };
    getInitialPosts();
  }, []);

  const getMorePosts = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const res = await feedAPI(LIMIT_VALUE, page * LIMIT_VALUE);
    if (res.data.posts.length === 0) return;
    setPostDatas((prevPosts) => [...prevPosts, ...res.data.posts]);
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(false);
  };

  const handleScroll = (entries) => {
    if (entries[0].isIntersecting && entries[0].intersectionRatio > 0) {
      getMorePosts();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.5,
    });
    if (contentRef.current && !isLoadingMore) {
      observer.observe(contentRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [contentRef.current, isLoadingMore]);

  const handleReport = async (e) => {
    e.stopPropagation();
    await reportPostAPI(postId);
    closeMenu();
    closeModal();
  };

  const scrollToTop = () => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <Header type="main" onClick={scrollToTop} />
      <ContentWrapper ref={scrollRef}>
        <h2 className="a11y-hidden">Focal 홈 피드</h2>

        <Container>
          <h3 className="a11y-hidden">내가 팔로우한 사람 글 목록</h3>

          {postDatas && postDatas.length > 0 ? (
            <div>
              {postDatas.map((data) => (
                <PostCard
                  key={data.id}
                  post={data}
                  setIsMenuOpen={openMenu}
                  setPostId={setPostId}
                />
              ))}
              <div ref={contentRef} style={{ height: '10px' }}></div>
              {isMenuOpen && (
                <BottomSheetModal setIsMenuOpen={closeMenu}>
                  <BottomSheetContent onClick={openModal}>
                    신고
                  </BottomSheetContent>
                </BottomSheetModal>
              )}
              {isModalOpen && (
                <ConfirmModal
                  title="게시글을 신고하시겠어요?"
                  confirmInfo="신고"
                  setIsMenuOpen={closeMenu}
                  setIsModalOpen={closeModal}
                  onClick={handleReport}
                />
              )}
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
    </>
  );
}
