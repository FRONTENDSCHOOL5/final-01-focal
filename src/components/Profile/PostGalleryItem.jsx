import styled from 'styled-components';
import multipleImg from '../../assets/icons/icon-multiple.svg';
import { useNavigate } from 'react-router-dom';

const GalleryListItem = styled.li`
  position: relative;
  cursor: pointer;
`;

const GalleryImg = styled.img`
  width: 100%;
  height: 114px;
  box-sizing: border-box;
  object-fit: cover;
`;

const MultipleImg = styled.img`
  position: absolute;
  top: 6px;
  right: 6px;
`;

export default function PostGalleryItem({ img, accountname }) {
  const galleryImg = img.split(',')[0];
  const navigate = useNavigate();
  return (
    <>
      {galleryImg && (
        <GalleryListItem
          onClick={() => {
            navigate(`/post/${accountname}`);
          }}
        >
          <GalleryImg src={galleryImg} />
          {img.split(',').length > 1 && <MultipleImg src={multipleImg} />}
        </GalleryListItem>
      )}
    </>
  );
}
