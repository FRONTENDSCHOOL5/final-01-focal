import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../Common/PostCard/PostCard';
import PostGalleryItem from './PostGalleryItem';
import BottomSheetModal from '../../layouts/Modal/BottomSheetModal';
import BottomSheetContent from '../../layouts/Modal/BottomSheetContent';
import ConfirmModal from '../../layouts/Modal/ConfirmModal';
import useModal from '../../hooks/useModal';
import { deletePostAPI, reportPostAPI } from '../../api/apis/post';
import { userpostAPI } from '../../api/apis/post';
import PostNone from './PostNone';
import PostAlignButtons from './PostAlignButtons';
import useScrollBottom from '../../hooks/useScrollBottom';

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  border-top: var(--border-color);
`;

const PostAlignWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 0.5px solid var(--border-color);
  border-bottom: 0.5px solid var(--border-color);
`;

const PostGalleryView = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 390px;
  width: 100%;
  height: 100%;
  padding: 16px;
  gap: 8px;
`;

const PostListView = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 390px;
  padding: 48px 0;
  gap: 65px;
`;

export default function ProfilePosts({
  elementRef,
  accountname,
  setIsPostLoading,
}) {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [isListView, setIsListView] = useState(true);
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();

  const useraccount = localStorage.getItem('accountname');
  const navigate = useNavigate();

  const isBottom = useScrollBottom(elementRef);
  const limit = 4;
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (isBottom && posts.length >= limit) {
      fetchPosts(skip + limit);
      setSkip((prevValue) => prevValue + limit);
    }
  }, [isBottom]);

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const fetchPosts = async (skip) => {
    const res = await userpostAPI(accountname, skip, limit);
    setIsPostLoading(false);

    if (skip === 0) {
      setPosts(res);
    } else {
      setPosts((prevData) => [...prevData, ...res]);
    }
  };

  const handleListAlign = () => {
    setIsListView(true);
  };

  const handleGalleryAlign = () => {
    setIsListView(false);
  };

  const handlePostDelete = async () => {
    await deletePostAPI(postId);
    const res = await userpostAPI(accountname, skip, limit);
    setPosts((prevData) => [...prevData, ...res]);
    closeMenu();
    closeModal();
  };

  const handlePostReport = async () => {
    await reportPostAPI(postId);
    alert('신고되었습니다.');
    closeMenu();
    closeModal();
  };

  return (
    <>
      {posts.length === 0 ? (
        <PostNone accountname={accountname} />
      ) : (
        <PostsContainer>
          <h2 className="a11y-hidden">프로필 포스트</h2>
          <PostAlignWrapper>
            <PostAlignButtons
              isListView={isListView}
              handleListAlign={handleListAlign}
              handleGalleryAlign={handleGalleryAlign}
            />
          </PostAlignWrapper>
          {isListView ? (
            <PostListView>
              {posts.map((post) => (
                <li key={post.createdAt}>
                  <PostCard
                    post={post}
                    setIsMenuOpen={openMenu}
                    setPostId={setPostId}
                  />
                </li>
              ))}
            </PostListView>
          ) : (
            <PostGalleryView>
              {posts.map((post) => (
                <PostGalleryItem
                  key={post.createdAt}
                  img={post.image}
                  _id={post.id}
                />
              ))}
            </PostGalleryView>
          )}
        </PostsContainer>
      )}

      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          {accountname !== useraccount ? (
            <BottomSheetContent onClick={handlePostReport}>
              신고
            </BottomSheetContent>
          ) : (
            <>
              <BottomSheetContent onClick={openModal}>삭제</BottomSheetContent>
              <BottomSheetContent
                onClick={() => {
                  navigate(`/post/${postId}/edit`);
                }}
              >
                수정
              </BottomSheetContent>
            </>
          )}
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="게시글을 삭제할까요?"
          confirmInfo="삭제"
          setIsMenuOpen={closeMenu}
          setIsModalOpen={closeModal}
          onClick={handlePostDelete}
        />
      )}
    </>
  );
}
