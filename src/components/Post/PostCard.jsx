import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfo from '../UserItem/UserInfo';
import IconButton from '../Button/IconButton';
import authInstance from '../../api/instance/authInstance';
import { ReactComponent as HeartIcon } from '../../assets/icons/icon-heart.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/icon-message-small.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/icon-more-small.svg';
import { convertTime } from '../../utils/convertTime';

const PostArticle = styled.article`
  position: relative;
  width: 390px;
  padding: 5px 20px;
`;

const PostContent = styled.section`
  margin: 12px 0;
  cursor: pointer;
  position: relative;

  p {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 12px;
  }

  img {
    width: 100%;
    aspect-ratio: 390/293;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ImageCarousel = styled.ul`
  display: flex;
  overflow: hidden;

  li {
    flex: 0 0 100%;
  }
`;

const ImageCarouselButtons = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ImageCarouselButton = styled.button`
  flex: 0 0 10px;
  height: 10px;
  margin: 0 5px;
  padding: 0;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? 'var(--main-color)' : 'var(--sub-text-color)'};
  cursor: pointer;
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

export default function PostCard({ post, setPostId, setIsMenuOpen }) {
  const {
    id,
    author,
    content,
    image,
    hearted,
    heartCount,
    commentCount,
    createdAt,
  } = post;

  const [likeInfo, setLikeInfo] = useState({
    liked: hearted,
    count: heartCount,
  });

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isProfile = pathname.includes('profile');
  const imageList = image.split(',');

  const handleLike = async () => {
    try {
      const endpoint = likeInfo.liked
        ? `/post/${id}/unheart`
        : `/post/${id}/heart`;
      const res = await (likeInfo.liked
        ? authInstance.delete(endpoint)
        : authInstance.post(endpoint));
      setLikeInfo({
        liked: res.data.post.hearted,
        count: res.data.post.heartCount,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleMenu = () => {
    setIsMenuOpen(true);
    setPostId(id);
  };

  return (
    <PostArticle>
      {!isProfile ? <UserInfo user={author} /> : null}
      <PostContent
        onClick={() => {
          navigate(`/post/${id}`);
        }}
      >
        <p>{content}</p>
        <ImageCarousel currentSlide={currentSlide}>
          {image &&
            imageList.map((_, index) => {
              return (
                <li key={id + index}>
                  <img src={imageList[currentSlide]} alt="" />
                </li>
              );
            })}
        </ImageCarousel>
        {imageList.length > 1 && (
          <ImageCarouselButtons>
            {imageList.map((_, index) => (
              <ImageCarouselButton
                key={index}
                active={index === currentSlide}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSlideChange(index);
                }}
              />
            ))}
          </ImageCarouselButtons>
        )}
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
        <time dateTime={createdAt}>{convertTime(createdAt)}</time>
      </ContentInfo>
      <StyledIconButton>
        <MoreIcon onClick={handleMenu} />
      </StyledIconButton>
    </PostArticle>
  );
}
