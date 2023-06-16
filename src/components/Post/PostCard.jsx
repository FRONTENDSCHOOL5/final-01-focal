import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '../Button/IconButton';
import profileImage from '../../assets/images/basic-profile-s.png';
import postImage from '../../assets/images/post-img-example.png';
import { ReactComponent as HeartIcon } from '../../assets/icons/icon-heart.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/icon-message-small.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/icon-more-small.svg';

const PostArticle = styled.article`
  position: relative;
  width: 390px;
  padding: 5px 0;
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
    min-width: 390px;
    height: 293px;
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
  }
`;

const StyledHeartIcon = styled(HeartIcon)`
  stroke: ${({ like }) =>
    like ? 'var(--main-color)' : 'var(--sub-text-color)'};
  fill: ${({ like }) => (like ? 'var(--main-color)' : 'transparent')};
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
  right: 0;
  padding: 0;
`;

export default function PostCard() {
  const [like, setLike] = useState(false);

  return (
    <PostArticle>
      <UserInfo>
        <img src={profileImage} alt="" />
        <div>
          <strong>애월읍 위니브 감귤농장</strong>
          <span>@weniv_Mandarin</span>
        </div>
      </UserInfo>
      <PostContent>
        <p>
          옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다.
          이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게
          뛰노는 인생의 힘있다.
        </p>
        <ul>
          <li>
            <img src={postImage} alt="" />
          </li>
        </ul>
      </PostContent>
      <ContentInfo>
        <InfoIcons>
          <IconButton>
            <StyledHeartIcon onClick={() => setLike(!like)} like={like} />
          </IconButton>
          <IconText>0</IconText>
          <IconButton>
            <CommentIcon fill="white" stroke="var(--sub-text-color)" />
          </IconButton>
          <IconText>0</IconText>
        </InfoIcons>
        <time dateTime="2023-06-15">2023년 6월 15일</time>
      </ContentInfo>
      <StyledIconButton>
        <MoreIcon />
      </StyledIconButton>
    </PostArticle>
  );
}
