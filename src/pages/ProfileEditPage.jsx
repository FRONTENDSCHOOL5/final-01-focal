import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import ProfileForm from '../components/SignUp/ProfileForm';
import { baseInstance } from '../api/baseInstance';

const Main = styled.main`
  width: 100%;
  margin-top: 48px;

  & > section {
    width: calc(100% - 34px * 2);
    max-width: 322px;
    margin: 48px auto;
    padding-top: 30px;

    & > div:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export default function ProfileEditPage() {
  const [inputValue, setInputValue] = useState({
    username: '',
    accountname: '',
    intro: '',
    image: '',
  });

  const getImageSrc = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await baseInstance.post('/image/uploadfile', formData);
      const { status } = res;
      if (status !== 200) throw new Error('에러');
      if (status === 200) {
        const {
          data: { filename },
        } = res;
        setInputValue({
          ...inputValue,
          image: `${process.env.REACT_APP_BASE_URL}/${filename}`,
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'image') {
      const { files } = e.target;
      getImageSrc(files[0]);
    } else {
      setInputValue({ ...inputValue, [id]: value });
    }
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    console.log('hi');
  };

  return (
    <>
      <Header type="upload" buttonId="profile-edit" />
      <Main>
        <section>
          <h2 className="a11y-hidden">
            프로필사진, 사용자이름, 계정ID, 자기소개 입력 컨테이너
          </h2>
          <ProfileForm
            formId="profile-edit"
            inputValue={inputValue}
            handleChange={handleInputChange}
            handleSubmit={handleProfileFormSubmit}
          />
        </section>
      </Main>
    </>
  );
}
