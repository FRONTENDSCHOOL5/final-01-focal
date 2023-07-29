import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import PostCard from '../components/Common/PostCard/PostCard';
import PostComment from '../components/Post/PostComment';
import TextInputBox from '../components/Common/Input/TextInputBox';
import authInstance from '../api/instance/authInstance';
import BottomSheetModal from '../layouts/Modal/BottomSheetModal';
import BottomSheetContent from '../layouts/Modal/BottomSheetContent';
import ConfirmModal from '../layouts//Modal/ConfirmModal';
import useModal from '../hooks/useModal';
import { deletePostAPI, reportPostAPI } from '../api/apis/post';
import { postDetailAPI } from '../api/apis/post';
import { getCommentListAPI } from '../api/apis/comment';

const Main = styled.main`
  margin-top: 48px;
  height: calc(100vh - 108px);
  overflow: scroll;
`;

const CardStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 16px;
  border-bottom: 1px solid var(--border-color);
`;

export default function PostPage() {
  const [postId, setPostId] = useState(useParams().post_id);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accountName = localStorage.getItem('accountname');
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();

  const handleDeleteButton = async () => {
    await deletePostAPI(postId);
    navigate('/profile');
  };

  const handleReportButton = async () => {
    await reportPostAPI(postId);
    closeMenu();
    closeModal();
  };

  const getPost = async () => {
    setIsLoading(true);

    try {
      const response = await postDetailAPI(postId);
      setPost(response.data.post);

      if (response.data.post.commentCount === 0) return;

      const comments = await getCommentListAPI(postId);
      setComments(comments);
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
      <Header type="basic" backBtnShow={true} />
      <Main>
        <CardStyle>
          {!isLoading && (
            <PostCard
              post={post}
              setIsMenuOpen={openMenu}
              setPostId={setPostId}
            />
          )}
        </CardStyle>
        {comments.length > 0 && (
          <PostComment
            comments={comments}
            postId={postId}
            onDelete={handleDeleteComment}
          />
        )}
        <TextInputBox type="comment" onButtonClick={handleCommentButton} />
      </Main>
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          {post.author.accountname === accountName ? (
            <>
              {' '}
              <BottomSheetContent
                onClick={() => navigate(`/post/${postId}/edit`)}
              >
                수정
              </BottomSheetContent>
              <BottomSheetContent onClick={openModal}>삭제</BottomSheetContent>
            </>
          ) : (
            <BottomSheetContent onClick={openModal}>신고</BottomSheetContent>
          )}
        </BottomSheetModal>
      )}
      {isModalOpen ? (
        post.author.accountname === accountName ? (
          <ConfirmModal
            title="게시글을 삭제하시겠어요?"
            confirmInfo="삭제"
            setIsMenuOpen={closeMenu}
            setIsModalOpen={closeModal}
            onClick={handleDeleteButton}
          />
        ) : (
          <ConfirmModal
            title="게시글을 신고하시겠어요?"
            confirmInfo="신고"
            setIsMenuOpen={closeMenu}
            setIsModalOpen={closeModal}
            onClick={handleReportButton}
          />
        )
      ) : null}
    </>
  );
}
