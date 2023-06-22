import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const accountName = localStorage.getItem('accountname');
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const handleDeleteButton = async () => {
    try {
      await authInstance.delete(`/post/${postId}`);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleReportButton = async () => {
    try {
      await authInstance.post(`/post/${postId}/report`);
      setIsMenuOpen(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async () => {
    setIsLoading(true);

    try {
      const response = await authInstance.get(`/post/${postId}`);
      setPost(response.data.post);

      if (response.data.post.commentCount === 0) return;

      const commentResponse = await authInstance.get(
        `/post/${postId}/comments`,
      );

      const sortedComments = commentResponse.data.comments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      setComments(sortedComments);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentButton = async (inputText) => {
    try {
      const response = await authInstance.post(`/post/${postId}/comments`, {
        comment: {
          content: inputText,
        },
      });
      const newComment = response.data.comment;
      setComments([...comments, newComment]);
      setPost((prev) => ({
        ...prev,
        commentCount: prev.commentCount + 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    setPost((prev) => ({
      ...prev,
      commentCount: prev.commentCount - 1,
    }));
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
      {comments.length > 0 && (
        <PostComment
          comments={comments}
          postId={postId}
          onDelete={handleDeleteComment}
        />
      )}
      <TextInputBox type="comment" onButtonClick={handleCommentButton} />
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={setIsMenuOpen}>
          {post.author.accountname === accountName ? (
            <>
              {' '}
              <BottomSheetContent
                onClick={() => navigate(`/post/${postId}/upload`)}
              >
                수정
              </BottomSheetContent>
              <BottomSheetContent onClick={() => setIsModalOpen(true)}>
                삭제
              </BottomSheetContent>
            </>
          ) : (
            <BottomSheetContent onClick={() => setIsModalOpen(true)}>
              신고
            </BottomSheetContent>
          )}
        </BottomSheetModal>
      )}
      {isModalOpen ? (
        post.author.accountname === accountName ? (
          <ConfirmModal
            title="게시글을 삭제하시겠어요?"
            confirmInfo="삭제"
            setIsMenuOpen={setIsMenuOpen}
            setIsModalOpen={setIsModalOpen}
            onClick={handleDeleteButton}
          />
        ) : (
          <ConfirmModal
            title="게시글을 신고하시겠어요?"
            confirmInfo="신고"
            setIsMenuOpen={setIsMenuOpen}
            setIsModalOpen={setIsModalOpen}
            onClick={handleReportButton}
          />
        )
      ) : null}
    </>
  );
}
