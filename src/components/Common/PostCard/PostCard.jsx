import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import IconButton from '../Button/IconButton';
import { likeAPI } from '../../../api/apis/like';
import { ReactComponent as HeartIcon } from '../../../assets/icons/icon-heart.svg';
import { ReactComponent as CommentIcon } from '../../../assets/icons/icon-message-small.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/icon-more-small.svg';
import { convertTime } from '../../../utils/convertTime';

const PostArticle = styled.article`
  position: relative;
  width: 358px;
`;

const PostContent = styled.section`
  margin: ${({ isProfile }) => (!isProfile ? '12px 0' : '0 0 12px 0')};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  p {
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 12px;
    word-break: break-all;
    &.post-preview {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  img {
    vertical-align: top;
    width: 100%;
    aspect-ratio: 304/228;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ImageCarousel = styled.ul`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};

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

const MoreButton = styled.button`
  position: absolute;
  top: ${({ isProfile }) => (!isProfile ? '0px' : '-40px')};
  right: 0px;
  padding: 10px;
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isProfile = pathname.includes('profile');
  const { post_id: postIdParams } = useParams();

  const imageList = useMemo(() => {
    return image.split(',');
  }, [image]);

  const handleLike = async () => {
    const { liked, count } = await likeAPI(id, likeInfo.liked);
    setLikeInfo({
      liked: liked,
      count: count,
    });
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleMenu = () => {
    setIsMenuOpen(true);
    setPostId(id);
  };

  return (
    <PostArticle>
      <h3 className="a11y-hidden">포스트</h3>
      {!isProfile ? <UserInfo user={author} /> : null}
      <PostContent
        isProfile={isProfile}
        onClick={() => {
          navigate(`/post/${id}`);
        }}
      >
        <h4 className="a11y-hidden">포스트 내용</h4>
        <p className={!postIdParams ? 'post-preview' : null}>{content}</p>
        <ImageCarousel currentSlide={currentSlide}>
          {image &&
            imageList.map((image, index) => {
              return (
                <li key={id + index}>
                  <img src={image} alt={`이미지 ${index + 1}`} />
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
                aria-label={`이미지 ${index + 1}`}
              />
            ))}
          </ImageCarouselButtons>
        )}
      </PostContent>
      <ContentInfo>
        <h4 className="a11y-hidden"> 좋아요 갯수, 댓글 갯수 및 게시글 날짜</h4>
        <InfoIcons>
          <IconButton>
            <span className="a11y-hidden">좋아요 버튼</span>
            <StyledHeartIcon onClick={handleLike} $liked={likeInfo.liked} />
          </IconButton>
          <IconText>{likeInfo.count}</IconText>
          <div
            onClick={() => {
              navigate(`/post/${id}`);
            }}
          >
            <IconButton>
              <span className="a11y-hidden">상세 글 정보보기 버튼</span>
              <CommentIcon fill="white" stroke="var(--sub-text-color)" />
            </IconButton>
            <IconText>{commentCount}</IconText>
          </div>
        </InfoIcons>
        <time dateTime={createdAt}>{convertTime(createdAt)}</time>
      </ContentInfo>
      <MoreButton type="button" isProfile={isProfile} onClick={handleMenu}>
        <span className="a11y-hidden">더보기 버튼</span>
        <MoreIcon />
      </MoreButton>
    </PostArticle>
  );
}
