import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authInstance from '../../api/instance/authInstance';
import PostCard from '../Common/PostCard/PostCard';
import PostGalleryItem from './PostGalleryItem';
import BottomSheetModal from '../../layouts/Modal/BottomSheetModal';
import BottomSheetContent from '../../layouts/Modal/BottomSheetContent';
import ConfirmModal from '../../layouts/Modal/ConfirmModal';
import Button from '../Common/Button/Button';
import { ReactComponent as PostGalleryIcon } from '../../assets/icons/icon-post-album.svg';
import { ReactComponent as PostListIcon } from '../../assets/icons/icon-post-list.svg';
import useModal from '../../hooks/useModal';
import LogoImg from '../../assets/images/logo.png';
import { userpostAPI } from '../../api/apis/post';

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

const PostsAlignRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 390px;
  width: 100%;
  height: 44px;
  padding-right: 10px;
`;

const AlignButton = styled.button.attrs({ type: 'button' })`
  background: transparent;
  border: none;
  height: 26px;
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

const NoPostsContainer = styled.section`
  width: 100%;
  height: calc(100vh - 300px);
  background-color: var(--white);
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px;
  height: 100%;
  gap: 25px;
`;

const PostInfoImg = styled.img`
  width: 100px;
  filter: grayscale(90%);
`;

const PostInfo = styled.h4`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function ProfilePosts({ accountname, setIsPostLoading }) {
  const [isListView, setIsListView] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isData, setIsData] = useState(true);
  const [postId, setPostId] = useState(null);
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

  useEffect(() => {
    userpostAPI(accountname).then((res) => {
      const data = res.data.post;
      setPosts(data);
      setIsPostLoading(false);
      if (data.length === 0) {
        setIsData(false);
      }
    });
  }, []);

  const handleListAlign = () => {
    setIsListView(true);
  };

  const handleGalleryAlign = () => {
    setIsListView(false);
  };

  const handlePostDelete = async () => {
    try {
      await authInstance.delete(`/post/${postId}`);
      userpostAPI(accountname).then((res) => {
        const data = res.data.post;
        setPosts(data);
        if (res.data.post.length === 0) {
          setIsData(false);
        }
      });
      closeMenu();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostReport = async () => {
    try {
      await authInstance.post(`/post/${postId}/report`);
      alert('신고되었습니다.');
      closeMenu();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isData ? (
        <PostsContainer>
          <h2 className="a11y-hidden">프로필 포스트</h2>
          <PostAlignWrapper>
            <PostsAlignRow>
              <AlignButton onClick={handleListAlign}>
                {isListView ? (
                  <PostListIcon
                    fill="var(--main-color)"
                    stroke="var(--main-color)"
                    aria-hidden={true}
                    role="img"
                  >
                    <desc id="desc">리스트 뷰 활성화</desc>
                  </PostListIcon>
                ) : (
                  <PostListIcon
                    fill="var(--light-gray)"
                    stroke="var(--light-gray)"
                    aria-hidden={true}
                    role="img"
                  >
                    <desc id="desc">리스트 뷰 비활성화</desc>
                  </PostListIcon>
                )}
              </AlignButton>
              <AlignButton onClick={handleGalleryAlign}>
                {isListView ? (
                  <PostGalleryIcon
                    fill="var(--light-gray)"
                    stroke="var(--light-gray)"
                    aria-hidden={true}
                    role="img"
                  >
                    <desc id="desc">갤러리 뷰 비활성화</desc>
                  </PostGalleryIcon>
                ) : (
                  <PostGalleryIcon
                    fill="var(--main-color)"
                    stroke="var(--main-color)"
                    aria-hidden={true}
                    role="img"
                  >
                    <desc id="desc">갤러리 뷰 활성화</desc>
                  </PostGalleryIcon>
                )}
              </AlignButton>
            </PostsAlignRow>
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
      ) : accountname !== useraccount ? (
        <NoPostsContainer>
          <PostInfoWrapper>
            <PostInfoImg src={LogoImg} />
            <PostInfo>아직 게시글이 없습니다!</PostInfo>
          </PostInfoWrapper>
        </NoPostsContainer>
      ) : (
        <NoPostsContainer>
          <PostInfoWrapper>
            <PostInfo>게시글을 작성해 보세요!</PostInfo>
            <Button
              onClick={() => {
                navigate(`/post/upload`);
              }}
              className="md"
            >
              작성하러 가기
            </Button>
          </PostInfoWrapper>
        </NoPostsContainer>
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
