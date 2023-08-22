import styled from 'styled-components';
import LogoImg from '../../assets/images/logo.png';
import Button from '../Common/Button/Button';
import { useNavigate } from 'react-router-dom';

const NoPostsContainer = styled.section`
  width: 100%;
  height: calc(100vh - 300px);
  background-color: var(--white);
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px;
  height: 100%;
  gap: 25px;
`;

const PostInfoImg = styled.img`
  width: 100px;
  filter: grayscale(90%);
`;

const PostInfo = styled.h4`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function PostNone({ accountname }) {
  const navigate = useNavigate();
  const useraccount = localStorage.getItem('accountname');

  return (
    <>
      {accountname !== useraccount ? (
        <NoPostsContainer>
          <PostInfoWrapper>
            <PostInfoImg src={LogoImg} />
            <PostInfo>아직 게시글이 없습니다!</PostInfo>
          </PostInfoWrapper>
        </NoPostsContainer>
      ) : (
        <NoPostsContainer>
          <PostInfoWrapper>
            <PostInfo>게시글을 작성해 보세요!</PostInfo>
            <Button
              onClick={() => {
                navigate(`/post/upload`);
              }}
              className="md"
            >
              작성하러 가기
            </Button>
          </PostInfoWrapper>
        </NoPostsContainer>
      )}
    </>
  );
}
