import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import PostUpload from '../components/Post/PostUpload';
import { useNavigate, useParams } from 'react-router-dom';
import authInstance from '../api/instance/authInstance';
import { postDetailAPI } from '../api/apis/post';

const PostMainStyle = styled.main`
  margin-top: 48px;
  display: flex;
  padding: 20px 16px 20px;
  min-width: 390px;
  width: 100%;
  height: calc(100vh - 48px);
  overflow-y: auto;
`;

export default function PostEditPage() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const { post_id } = useParams();
  const [inputValue, setInputValue] = useState({ content: '', image: [] });

  useEffect(() => {
    const getData = async () => {
      const {
        data: { post },
      } = await postDetailAPI(post_id);

      setInputValue({ content: post.content, image: post.image.split(',') });
    };
    getData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { content, image } = inputValue;

    if (!image.length) {
      alert('한개이상의 이미지를 첨부해주세요');
      return;
    }

    try {
      await authInstance.put(`/post/${post_id}`, {
        post: {
          content,
          image: image.join(),
        },
      });
      navigate('/profile/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header
        type="upload"
        buttonText={'업로드'}
        disabled={disabled}
        buttonId={'post'}
      />
      <PostMainStyle>
        <h2 className="a11y-hidden">게시글 작성</h2>
        <PostUpload
          setDisabled={setDisabled}
          inputValue={inputValue}
          handleFormSubmit={handleFormSubmit}
          setInputValue={setInputValue}
        />
      </PostMainStyle>
    </>
  );
}
