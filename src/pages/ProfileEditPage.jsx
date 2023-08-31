import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import ProfileForm from '../components/Common/ProfileForm/ProfileForm';
import { useNavigate } from 'react-router-dom';
import { getImageSrcAPI } from '../api/apis/image';
import { editMyInfoAPI, getMyInfoAPI } from '../api/apis/user';

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
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: '',
    accountname: '',
    intro: '',
    image: '',
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id !== 'image') {
      setInputValue({ ...inputValue, [id]: value });
    } else {
      const { files } = e.target;
      getImageSrcAPI(files[0]).then(({ filename }) => {
        setInputValue({
          ...inputValue,
          image: `${process.env.REACT_APP_BASE_URL}/${filename}`,
        });
      });
    }
  };

  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    const { accountname, image } = await editMyInfoAPI(inputValue);
    localStorage.setItem('accountname', accountname);
    localStorage.setItem('image', image);
    navigate('/profile');
  };

  useEffect(() => {
    const getData = async () => {
      const { image, username, accountname, intro } = await getMyInfoAPI();
      setInputValue({ image, username, accountname, intro });
    };
    getData();
  }, []);

  return (
    <>
      <Header
        type="upload"
        buttonId="profile"
        buttonText={'저장'}
        btnDisabled={btnDisabled}
      />
      <Main>
        <section>
          <h2 className="a11y-hidden">
            프로필사진, 사용자이름, 계정ID, 자기소개 입력 컨테이너
          </h2>
          <ProfileForm
            inputValue={inputValue}
            handleChange={handleInputChange}
            handleSubmit={handleProfileFormSubmit}
            btnDisabled={btnDisabled}
            setBtnDisabled={setBtnDisabled}
          />
        </section>
      </Main>
    </>
  );
}
