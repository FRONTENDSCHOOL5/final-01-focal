import React, { useState } from 'react';
import styled from 'styled-components';
import authInstance from '../../api/instance/authInstance';
import IconButton from '../Button/IconButton';
import { ReactComponent as HeartIcon } from '../../assets/icons/icon-heart.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/icon-message-small.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/icon-more-small.svg';
import profileImage from '../../assets/images/basic-profile-s.png';
import { useNavigate } from 'react-router-dom';

const PostArticle = styled.article`
  position: relative;
  width: 390px;
  padding: 5px 20px;
`;

const UserInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

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
  cursor: pointer;

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

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

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
    author,
    content,
    image,
    hearted,
    heartCount,
    commentCount,
    createdAt,
  } = data;

  const [likeInfo, setLikeInfo] = useState({
    liked: hearted,
    count: heartCount,
  });

  const navigate = useNavigate();
  const date = `
    ${createdAt.slice(0, 4)}년 
    ${createdAt.slice(5, 7)}월 
    ${createdAt.slice(8, 10)}일
  `;

  const handleLike = async () => {
    try {
      const endpoint = likeInfo.liked
        ? `/post/${id}/unheart`
        : `/post/${id}/heart`;
      const res = await (likeInfo.liked
        ? authInstance.delete(endpoint)
        : authInstance.post(endpoint));
      console.log(res);
      setLikeInfo({
        liked: res.data.post.hearted,
        count: res.data.post.heartCount,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostArticle>
      <UserInfo
        onClick={() => {
          navigate(`/profile/${author.accountname}`);
        }}
      >
        <img src={profileImage} alt="" />
        <div>
          <strong>{author.username}</strong>
          <span>@ {author.accountname}</span>
        </div>
      </UserInfo>
      <PostContent
        onClick={() => {
          navigate(`/post/${id}`);
        }}
      >
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
            <StyledHeartIcon onClick={handleLike} $liked={likeInfo.liked} />
          </IconButton>
          <IconText>{likeInfo.count}</IconText>
          <div
            onClick={() => {
              navigate(`/post/${id}`);
            }}
          >
            <IconButton>
              <CommentIcon fill="white" stroke="var(--sub-text-color)" />
            </IconButton>
            <IconText>{commentCount}</IconText>
          </div>
        </InfoIcons>
        <time dateTime={createdAt}>{date}</time>
      </ContentInfo>
      <StyledIconButton>
        <MoreIcon />
      </StyledIconButton>
    </PostArticle>
  );
}
