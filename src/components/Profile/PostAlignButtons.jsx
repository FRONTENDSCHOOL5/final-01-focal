import styled from 'styled-components';
import { ReactComponent as PostGalleryIcon } from '../../assets/icons/icon-post-album.svg';
import { ReactComponent as PostListIcon } from '../../assets/icons/icon-post-list.svg';

const PostsAlignRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 390px;
  width: 100%;
  height: 44px;
  padding-right: 10px;
`;

const AlignButton = styled.button.attrs({ type: 'button' })`
  background: transparent;
  border: none;
  height: 26px;
`;

const PostAlignButtons = ({
  isListView,
  handleListAlign,
  handleGalleryAlign,
}) => {
  return (
    <PostsAlignRow>
      <AlignButton onClick={handleListAlign}>
        {isListView ? (
          <PostListIcon
            fill="var(--main-color)"
            stroke="var(--main-color)"
            aria-hidden={true}
            role="img"
          >
            <desc id="desc">리스트 뷰 활성화</desc>
          </PostListIcon>
        ) : (
          <PostListIcon
            fill="var(--light-gray)"
            stroke="var(--light-gray)"
            aria-hidden={true}
            role="img"
          >
            <desc id="desc">리스트 뷰 비활성화</desc>
          </PostListIcon>
        )}
      </AlignButton>
      <AlignButton onClick={handleGalleryAlign}>
        {isListView ? (
          <PostGalleryIcon
            fill="var(--light-gray)"
            stroke="var(--light-gray)"
            aria-hidden={true}
            role="img"
          >
            <desc id="desc">갤러리 뷰 비활성화</desc>
          </PostGalleryIcon>
        ) : (
          <PostGalleryIcon
            fill="var(--main-color)"
            stroke="var(--main-color)"
            aria-hidden={true}
            role="img"
          >
            <desc id="desc">갤러리 뷰 활성화</desc>
          </PostGalleryIcon>
        )}
      </AlignButton>
    </PostsAlignRow>
  );
};

export default PostAlignButtons;
