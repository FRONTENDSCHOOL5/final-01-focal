import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import multipleImg from '../../assets/icons/icon-multiple.svg';

const GalleryListItem = styled.li`
  position: relative;
  cursor: pointer;
`;

const GalleryImg = styled.img`
  width: 100%;
  height: 114px;
  box-sizing: border-box;
  object-fit: cover;
  border-radius: 5px;
`;

const MultipleImg = styled.img`
  position: absolute;
  top: 6px;
  right: 6px;
`;

export default function PostGalleryItem({ img, _id }) {
  const galleryImg = img.split(',')[0];
  const navigate = useNavigate();
  return (
    <>
      {galleryImg && (
        <GalleryListItem
          onClick={() => {
            navigate(`/post/${_id}`);
          }}
        >
          <GalleryImg src={galleryImg} alt="갤러리 게시글 이미지" />
          {img.split(',').length > 1 && (
            <MultipleImg src={multipleImg} alt="여러장 아이콘" />
          )}
        </GalleryListItem>
      )}
    </>
  );
}
