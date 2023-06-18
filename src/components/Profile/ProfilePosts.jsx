import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PostListIcon } from '../../assets/icons/icon-post-list.svg';
import { ReactComponent as PostGalleryIcon } from '../../assets/icons/icon-post-album.svg';

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--white);
`;

const PostAlignWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: var(--border-color);
  border-bottom: 0.5px solid var(--border-color);
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

const PostGalleryView = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 390px;
  width: 100%;
  padding: 16px 16px 70px;
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
  max-width: 390px;
  width: 100%;
  padding: 16px 16px 70px;
  gap: 20px;
`;

const PostListItem = styled.div`
  height: 434px;
  background-color: orange;
`;

export default function ProfilePosts() {
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
            {isListView ? (
              <PostListIcon
                fill="var(--main-color)"
                strock="var(--main-color)"
              />
            ) : (
              <PostListIcon
                fill="var(--light-gray)"
                stroke="var(--light-gray)"
              />
            )}
          </Button>
          <Button onClick={handleGalleryAlign}>
            {isListView ? (
              <PostGalleryIcon
                fill="var(--light-gray)"
                stroke="var(--light-gray)"
              />
            ) : (
              <PostGalleryIcon
                fill="var(--main-color)"
                strock="var(--main-color)"
              />
            )}
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
}
