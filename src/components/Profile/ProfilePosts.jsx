import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import authInstance from '../../api/instance/authInstance';
import PostCard from '../Post/PostCard';
import { ReactComponent as PostGalleryIcon } from '../../assets/icons/icon-post-album.svg';
import { ReactComponent as PostListIcon } from '../../assets/icons/icon-post-list.svg';
import PostGalleryItem from './PostGalleryItem';
import BottomSheetModal from '../Modal/BottomSheetModal';
import BottomSheetContent from '../Modal/BottomSheetContent';
import ConfirmModal from '../Modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--white);
`;

const PostAlignWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: var(--border-color);
  border-bottom: 0.5px solid var(--border-color);
`;

const PostsAlignRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 390px;
  width: 100%;
  height: 44px;
`;

const Button = styled.button.attrs({ type: 'button' })`
  background: transparent;
  border: none;
`;

const PostGalleryView = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 390px;
  width: 100%;
  padding: 16px 16px 70px;
  gap: 8px;
`;

const PostListView = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 390px;
  width: 100%;
  padding: 16px 16px 70px;
  gap: 20px;
`;

export default function ProfilePosts({ accountname }) {
  const [isListView, setIsListView] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  console.log(postId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleListAlign = () => {
    setIsListView(true);
  };

  const handleGalleryAlign = () => {
    setIsListView(false);
  };

  const openModal = () => {
    setIsMenuOpen(true);
    setIsModalOpen(true);
  };

  const handlePostDelete = async () => {
    try {
      console.log(`/post/${postId}`);
      const res = await authInstance.delete(`/post/${postId}`);
      console.log(res);
      setIsMenuOpen(false);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await authInstance.get(`/post/${accountname}/userpost`);
      setPosts(res.data.post);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <PostsContainer>
        <h2 className="a11y-hidden">포스트</h2>
        <PostAlignWrapper>
          <PostsAlignRow>
            <Button onClick={handleListAlign}>
              {isListView ? (
                <PostListIcon
                  fill="var(--main-color)"
                  strock="var(--main-color)"
                />
              ) : (
                <PostListIcon
                  fill="var(--light-gray)"
                  stroke="var(--light-gray)"
                />
              )}
            </Button>
            <Button onClick={handleGalleryAlign}>
              {isListView ? (
                <PostGalleryIcon
                  fill="var(--light-gray)"
                  stroke="var(--light-gray)"
                />
              ) : (
                <PostGalleryIcon
                  fill="var(--main-color)"
                  strock="var(--main-color)"
                />
              )}
            </Button>
          </PostsAlignRow>
        </PostAlignWrapper>
        {isListView ? (
          <PostListView>
            {posts.map((post) => (
              <li key={post.createdAt}>
                <PostCard
                  post={post}
                  setIsMenuOpen={setIsMenuOpen}
                  setPostId={setPostId}
                />
              </li>
            ))}
          </PostListView>
        ) : (
          <PostGalleryView>
            {posts.map((post) => (
              <li key={post.createdAt}>
                <PostGalleryItem
                  img={post.image}
                  accountname={post.author.accountname}
                />
              </li>
            ))}
          </PostGalleryView>
        )}
      </PostsContainer>
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={setIsMenuOpen}>
          <BottomSheetContent onClick={openModal}>삭제</BottomSheetContent>
          <BottomSheetContent
            onClick={() => {
              navigate(`/post/${postId}/upload`);
            }}
          >
            수정
          </BottomSheetContent>
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="게시글을 삭제할까요?"
          confirmInfo="삭제"
          setIsMenuOpen={setIsMenuOpen}
          setIsModalOpen={setIsModalOpen}
          onClick={handlePostDelete}
        />
      )}
    </>
  );
}
