import styled from 'styled-components';
import postListImgOn from '../../assets/icons/icon-post-list-on.svg';
import postListImgOff from '../../assets/icons/icon-post-list-off.svg';
import postGalleryImgOn from '../../assets/icons/icon-post-album-on.svg';
import postGalleryImgOff from '../../assets/icons/icon-post-album-off.svg';
import { useState } from 'react';

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 100%;
`;

const PostAlignWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 0.5px solid #dbdbdb;
  border-bottom: 0.5px solid #dbdbdb;
`;

const PostsAlignRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 390px;
  width: 100%;
  height: 44px;
`;

const Button = styled.button.attrs({ type: 'button' })`
  background: transparent;
  border: none;
`;

const AlignImg = styled.img`
  width: 30px;
  height: 30px;
`;

const PostGalleryView = styled.ul`
  display: grid;
  max-width: 390px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 16px;
  width: 100%;
  gap: 8px;
`;

const PostGalleryItem = styled.li`
  width: 100%;
  height: 114px;
  background-color: orange;
  border: 1px solid gray;
  box-sizing: border-box;
`;

const PostListView = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  max-width: 390px;
  width: 100%;
  gap: 20px;
`;

const PostListItem = styled.div`
  height: 434px;
  background-color: orange;
`;

const PostContainer = () => {
  const [isListView, setIsListView] = useState(true);

  const handleListAlign = () => {
    setIsListView(true);
  };

  const handleGalleryAlign = () => {
    setIsListView(false);
  };

  return (
    <PostsContainer>
      <h2 className="a11y-hidden">포스트</h2>
      <PostAlignWrapper>
        <PostsAlignRow>
          <Button onClick={handleListAlign}>
            <AlignImg
              alt="리스트로 보기 버튼"
              src={isListView ? postListImgOn : postListImgOff}
            />
          </Button>
          <Button onClick={handleGalleryAlign}>
            <AlignImg
              alt="갤러리로 보기 버튼"
              src={isListView ? postGalleryImgOff : postGalleryImgOn}
            />
          </Button>
        </PostsAlignRow>
      </PostAlignWrapper>
      {isListView ? (
        <PostListView>
          <PostListItem />
          <PostListItem />
          <PostListItem />
        </PostListView>
      ) : (
        <PostGalleryView>
          <PostGalleryItem />
          <PostGalleryItem />
          <PostGalleryItem />
          <PostGalleryItem />
        </PostGalleryView>
      )}
    </PostsContainer>
  );
};

export default PostContainer;
