import styled from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import logo from '../assets/images/basic-profile.png';
import PostCard from '../components/Post/PostCard';
import { useEffect, useState } from 'react';
import authInstance from '../api/instance/authInstance';
import NavBar from '../components/NavBar/NavBar';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: calc(100vh - 108px); */
  gap: 20px;
  padding: 60px 16px 72px;
  /* overflow-y: scroll; */
`;

const Img = styled.img`
  width: 100px;
`;

const Info = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function HomePage() {
  const [postDatas, setPostDatas] = useState();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await authInstance.get('/post/feed');
        setPostDatas(res.data.posts);
        console.log(postDatas);
        if (res.status === 200) {
          setStatus(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [status]);

  return (
    <>
      <Header type="main" />
      <Container>
        <h2 className="a11y-hidden">Focal 홈 피드</h2>

        {postDatas ? (
          postDatas.map((data) => <PostCard key={data._id} data={data} />)
        ) : (
          <>
            <Img src={logo} alt="감귤 마켓 로고" />
            <Info>유저를 검색해 팔로우 해보세요!</Info>
            <Button type="button" className="md">
              검색하기
            </Button>
          </>
        )}
      </Container>
      <NavBar />
    </>
  );
}
