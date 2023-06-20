import React, { useState } from 'react';
import styled from 'styled-components';
import authInstance from '../../api/instance/authInstance';
import IconButton from '../Button/IconButton';
import { ReactComponent as HeartIcon } from '../../assets/icons/icon-heart.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/icon-message-small.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/icon-more-small.svg';
import profileImage from '../../assets/images/basic-profile-s.png';

const PostArticle = styled.article`
  position: relative;
  width: 390px;
  padding: 5px 20px;
`;

const UserInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    display: block;
    font-size: 14px;
    font-weight: 500;
  }

  span {
    font-size: 12px;
    line-height: 14px;
    color: var(--sub-text-color);
  }
`;

const PostContent = styled.section`
  margin: 12px 0;

  p {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 12px;
  }

  li {
    width: 100%;
  }

  img {
    width: 100%;
    aspect-ratio: 390/293;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ContentInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  time {
    font-size: 10px;
    color: var(--sub-text-color);
  }
`;

const StyledHeartIcon = styled(HeartIcon)`
  stroke: ${({ $liked }) =>
    $liked ? 'var(--main-color)' : 'var(--sub-text-color)'};
  fill: ${({ $liked }) => ($liked ? 'var(--main-color)' : 'transparent')};
`;

const InfoIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconText = styled.span`
  font-size: 12px;
  margin: 0 18px 0 6px;
`;

const StyledIconButton = styled.button`
  position: absolute;
  top: 5px;
  right: 15px;
  padding: 0;
`;

export default function PostCard({ data }) {
  const {
    id,
    username,
    accountname,
    content,
    image,
    hearted,
    heartCount,
    commentCount,
    createdAt,
  } = data;

  const [liked, setLiked] = useState(hearted);
  const [likeCount, setLikeCount] = useState(heartCount);

  const date = `
  ${createdAt.slice(0, 4)}년 
  ${createdAt.slice(5, 7)}월 
  ${createdAt.slice(8, 10)}일
  `;

  const handleLike = async () => {
    try {
      const res = await authInstance.post(`/post/${id}/heart`);
      setLiked(res.data.post.hearted);
      setLikeCount(res.data.post.heartCount);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      const res = await authInstance.delete(`/post/${id}/unheart`);
      setLiked(res.data.post.hearted);
      setLikeCount(res.data.post.heartCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostArticle>
      <UserInfo>
        <img src={profileImage} alt="" />
        <div>
          <strong>{username}</strong>
          <span>{accountname}</span>
        </div>
      </UserInfo>
      <PostContent>
        <p>{content}</p>
        <ul>
          <li>
            <img src={image} alt="" />
          </li>
        </ul>
      </PostContent>
      <ContentInfo>
        <InfoIcons>
          <IconButton>
            <StyledHeartIcon
              onClick={liked ? handleUnlike : handleLike}
              $liked={liked}
            />
          </IconButton>
          <IconText>{likeCount}</IconText>
          <IconButton>
            <CommentIcon fill="white" stroke="var(--sub-text-color)" />
          </IconButton>
          <IconText>{commentCount}</IconText>
        </InfoIcons>
        <time dateTime={createdAt}>{date}</time>
      </ContentInfo>
      <StyledIconButton>
        <MoreIcon />
      </StyledIconButton>
    </PostArticle>
  );
}
