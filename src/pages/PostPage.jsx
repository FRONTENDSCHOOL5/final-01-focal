import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import PostCard from '../components/Post/PostCard';
import PostComment from '../components/Post/PostComment';
import TextInputBox from '../components/Input/TextInputBox';
import authInstance from '../api/instance/authInstance';
import BottomSheetModal from '../components/Modal/BottomSheetModal';
import BottomSheetContent from '../components/Modal/BottomSheetContent';
import ConfirmModal from '../components/Modal/ConfirmModal';

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  width: 100%;
  padding: 20px 16px;
  border-bottom: 1px solid var(--border-color);
`;

export default function PostPage() {
  const [postId, setPostId] = useState(useParams().post_id);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const accountName = localStorage.getItem('accountname');

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

  const getPost = async () => {
    setIsLoading(true);

    try {
      const response = await authInstance.get(`/post/${postId}`);
      setPost(response.data.post);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      getPost();
    }
  }, [postId]);

  return (
    <>
      <Header type="basic" />
      <Main>
        {!isLoading && (
          <PostCard
            post={post}
            setIsMenuOpen={setIsMenuOpen}
            setPostId={setPostId}
          />
        )}
      </Main>
      <PostComment />
      <TextInputBox type="comment" />
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={setIsMenuOpen}>
          {post.author.accountname === accountName ? (
            <>
              {' '}
              <BottomSheetContent>수정</BottomSheetContent>
              <BottomSheetContent
                onClick={() => {
                  setIsDelete(true);
                  setIsModalOpen(true);
                }}
              >
                삭제
              </BottomSheetContent>
            </>
          ) : (
            <BottomSheetContent onClick={openModal}>신고</BottomSheetContent>
          )}
        </BottomSheetModal>
      )}
      {isModalOpen ? (
        isDelete ? (
          <ConfirmModal
            title="게시글을 삭제하시겠어요?"
            confirmInfo="삭제"
            setIsMenuOpen={setIsMenuOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <ConfirmModal
            title="게시글을 신고하시겠어요?"
            confirmInfo="신고"
            setIsMenuOpen={setIsMenuOpen}
            setIsModalOpen={setIsModalOpen}
            onClick={handleReport}
          />
        )
      ) : null}
    </>
  );
}
