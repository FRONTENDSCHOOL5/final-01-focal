import styled from 'styled-components';
import multipleImg from '../../assets/icons/icon-multiple.svg';
import { useNavigate } from 'react-router-dom';

const Div = styled.div`
  position: relative;
  cursor: pointer;
`;

const GalleryItem = styled.img`
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
  const defaultImg = localStorage.getItem('image');
  const galleryImg = img.split(',')[0];
  const navigate = useNavigate();

  return (
    <Div
      onClick={() => {
        navigate(`/post/${accountname}`);
      }}
    >
      {img ? (
        img.split(',').length > 1 ? (
          <Div>
            <GalleryItem src={galleryImg} />
            <MultipleImg src={multipleImg} />
          </Div>
        ) : (
          <GalleryItem src={galleryImg} />
        )
      ) : (
        <GalleryItem src={defaultImg} />
      )}
    </Div>
  );
}
