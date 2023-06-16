import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageSrc from '../../assets/images/basic-profile-s.png';
import Btn from '../../assets/icons/icon-more.svg';

const CommentSection = styled.section`
  max-width: 390px;
  padding: 20px 16px 0;
  margin: 0 auto;
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
const comments = [
  {
    id: 1,
    userName: '재윤',
    userProfile: ImageSrc,
    date: '2주',
    text: '프로젝트가 기대된다.',
  },
];

function PostComment() {
  return (
    <CommentSection>
      <h2 className="a11y-hidden">댓글목록</h2>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentInfo>
              <ProfileLink to="/">
                <ProfileImage src={comment.userProfile} alt="사용자이미지" />
              </ProfileLink>
              <NameLink to="/">
                <UserName>{comment.userName}</UserName>
              </NameLink>
              <CommentDate>{comment.date}</CommentDate>
            </CommentInfo>
            <CommentText>{comment.text}</CommentText>
            <MoreBtn />
          </CommentItem>
        ))}
      </ul>
    </CommentSection>
  );
}

export default PostComment;
