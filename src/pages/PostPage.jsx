import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import PostCard from '../components/Common/PostCard/PostCard';
import PostComment from '../components/Post/PostComment';
import TextInputBox from '../components/Common/Input/TextInputBox';
import BottomSheetModal from '../layouts/Modal/BottomSheetModal';
import BottomSheetContent from '../layouts/Modal/BottomSheetContent';
import ConfirmModal from '../layouts//Modal/ConfirmModal';
import useModal from '../hooks/useModal';
import { deletePostAPI, reportPostAPI } from '../api/apis/post';
import { postDetailAPI } from '../api/apis/post';
import { getCommentListAPI, createPostCommentAPI } from '../api/apis/comment';
import { useInView } from 'react-intersection-observer';

const Main = styled.main`
  margin-top: 48px;
  height: calc(100vh - 108px);
  overflow: scroll;
  scroll-behavior: smooth;
`;

const CardStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 16px;
  border-bottom: 1px solid var(--border-color);
`;

const Div = styled.div`
  height: 1px;
`;

const LIMIT = 10;

export default function PostPage() {
  const [postId, setPostId] = useState(useParams().post_id);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accountName = localStorage.getItem('accountname');
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loadedComments, setLoadedComments] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const { ref, inView } = useInView({ threshold: 0 });
  const mainRef = useRef(null);

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

      const commentCount = response.data.post.commentCount;

      if (commentCount === 0) return;

      const initialComments = await getCommentListAPI(postId, LIMIT, 0);
      setComments(initialComments);
      setLoadedComments(initialComments.length);
      setTotalComments(commentCount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getComments = async () => {
    try {
      if (totalComments === loadedComments) return;

      const newComments = await getCommentListAPI(
        postId,
        LIMIT,
        loadedComments,
      );

      setComments((prevComments) => [...prevComments, ...newComments]);
      setLoadedComments((prevLoaded) => prevLoaded + newComments.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentButton = async (inputText) => {
    const newComment = await createPostCommentAPI(inputText, postId);

    setComments([newComment, ...comments]);
    setLoadedComments((prev) => prev + 1);
    setPost((prev) => ({
      ...prev,
      commentCount: prev.commentCount + 1,
    }));

    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
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

  useEffect(() => {
    if (inView) {
      getComments();
    }
  }, [inView]);

  return (
    <>
      <Header type="basic" backBtnShow={true} />
      <Main ref={mainRef}>
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
          <>
            <PostComment
              comments={comments}
              postId={postId}
              onDelete={handleDeleteComment}
            />
            <Div ref={ref} />
          </>
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
