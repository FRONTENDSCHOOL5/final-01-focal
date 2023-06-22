import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Btn from '../../assets/icons/icon-more.svg';
import defaultImage from '../../assets/images/basic-profile-s.png';

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

function PostComment({ comments }) {
  const timeAgo = (date) => {
    const currentTime = new Date();
    const commentDate = new Date(date);
    const timeDifference = currentTime - commentDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (seconds === 0) {
      return '방금';
    } else if (seconds < 60) {
      return `${seconds}초 전`;
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else if (weeks < 52) {
      return `${weeks}주 전`;
    } else {
      return `${years}년 전`;
    }
  };

  const getImage = (image) => {
    if (image === 'http://146.56.183.55:5050/Ellipse.png') {
      return defaultImage;
    }

    return image;
  };

  return (
    <CommentSection>
      <h2 className="a11y-hidden">댓글목록</h2>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentInfo>
              <ProfileLink to="/">
                <ProfileImage
                  src={getImage(comment.author.image)}
                  alt="사용자이미지"
                />
              </ProfileLink>
              <NameLink to="/">
                <UserName>{comment.author.username}</UserName>
              </NameLink>
              <CommentDate>{timeAgo(comment.createdAt)}</CommentDate>
            </CommentInfo>
            <CommentText>{comment.content}</CommentText>
            <MoreBtn />
          </CommentItem>
        ))}
      </ul>
    </CommentSection>
  );
}

export default PostComment;
