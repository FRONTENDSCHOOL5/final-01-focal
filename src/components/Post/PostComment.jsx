import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Btn from '../../assets/icons/icon-more.svg';
import defaultImage from '../../assets/images/basic-profile-s.png';
import BottomSheetModal from '../../layouts/Modal/BottomSheetModal';
import BottomSheetContent from '../../layouts/Modal/BottomSheetContent';
import ConfirmModal from '../../layouts/Modal/ConfirmModal';
import authInstance from '../../api/instance/authInstance';
import useModal from '../../hooks/useModal';
import { convertTime } from '../../utils/convertTime';
import { deleteCommentAPI } from '../../api/apis/comment';

const CommentSection = styled.section`
  max-width: 390px;
  padding: 20px 16px 0;
  margin: 0 auto;
  margin-bottom: 60px;
`;

const CommentItem = styled.li`
  margin-bottom: 16px;
  position: relative;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const ProfileLink = styled(Link)`
  margin-right: 12px;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid var(--border-color);
`;

const NameLink = styled(Link)`
  margin: 6px 6px 0 0;
`;

const UserName = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

const CommentDate = styled.span`
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
  color: var(--sub-txt-color);
  margin-top: 8.5px;

  &::before {
    content: '·';
    margin-right: 4px;
  }
`;

const CommentText = styled.p`
  padding-left: 48px;
  font-size: 14px;
  line-height: 18px;
  color: #333333;
`;

const MoreBtn = styled.button`
  content: '';
  position: absolute;
  top: 5px;
  right: 0;
  width: 20px;
  height: 20px;
  background-image: url(${Btn});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

function PostComment({ comments, postId, onDelete }) {
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const [author, setAuthor] = useState('');
  const [commentId, setCommentId] = useState('');
  const accountName = localStorage.getItem('accountname');

  const getImage = (image) => {
    if (image === 'http://146.56.183.55:5050/Ellipse.png') {
      return defaultImage;
    }

    return image;
  };

  const handleDeleteButton = async () => {
    await deleteCommentAPI(postId, commentId);
    closeMenu();
    closeModal();
    onDelete(commentId);
  };

  const handleReportButton = async () => {
    try {
      await authInstance.post(`/post/${postId}/comments/${commentId}/report`);
      closeMenu();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CommentSection>
      <h2 className="a11y-hidden">댓글목록</h2>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentInfo>
              <ProfileLink to={`/profile/${comment.author.accountname}`}>
                <ProfileImage
                  src={getImage(comment.author.image)}
                  alt="사용자이미지"
                />
              </ProfileLink>
              <NameLink to={`/profile/${comment.author.accountname}`}>
                <UserName>{comment.author.username}</UserName>
              </NameLink>
              <CommentDate>{convertTime(comment.createdAt)}</CommentDate>
            </CommentInfo>
            <CommentText>{comment.content}</CommentText>
            <MoreBtn
              onClick={() => {
                openMenu();
                setAuthor(comment.author.accountname);
                setCommentId(comment.id);
              }}
            />
          </CommentItem>
        ))}
      </ul>
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          {author === accountName ? (
            <>
              <BottomSheetContent
                onClick={() => {
                  openModal();
                }}
              >
                삭제
              </BottomSheetContent>
            </>
          ) : (
            <BottomSheetContent onClick={() => openModal()}>
              신고
            </BottomSheetContent>
          )}
        </BottomSheetModal>
      )}
      {isModalOpen ? (
        author === accountName ? (
          <ConfirmModal
            title="댓글을 삭제하시겠어요?"
            confirmInfo="삭제"
            setIsMenuOpen={closeMenu}
            setIsModalOpen={closeModal}
            onClick={handleDeleteButton}
          />
        ) : (
          <ConfirmModal
            title="신고하시겠어요?"
            confirmInfo="신고"
            setIsMenuOpen={closeMenu}
            setIsModalOpen={closeModal}
            onClick={handleReportButton}
          />
        )
      ) : null}
    </CommentSection>
  );
}

export default PostComment;
