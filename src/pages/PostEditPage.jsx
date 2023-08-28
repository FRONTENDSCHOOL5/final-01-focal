import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import PostUpload from '../components/Post/PostUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { editPostAPI } from '../api/apis/post';
import { postDetailAPI } from '../api/apis/post';
import { alertMessage } from '../constants/alertMessage';

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
  const [btnDisabled, setBtnDisabled] = useState(false);
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
      alert(alertMessage.imgLengthError);
      return;
    }
    await editPostAPI(post_id, content, image);
    navigate('/profile/');
  };

  return (
    <>
      <Header
        type="upload"
        buttonText={'업로드'}
        btnDisabled={btnDisabled}
        buttonId={'post'}
      />
      <PostMainStyle>
        <h2 className="a11y-hidden">게시글 작성</h2>
        <PostUpload
          setBtnDisabled={setBtnDisabled}
          inputValue={inputValue}
          handleFormSubmit={handleFormSubmit}
          setInputValue={setInputValue}
        />
      </PostMainStyle>
    </>
  );
}
