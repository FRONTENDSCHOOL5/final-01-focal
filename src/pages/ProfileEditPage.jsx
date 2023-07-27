import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../layouts/Header/Header';
import ProfileForm from '../components/Common/ProfileForm/ProfileForm';
import authInstance from '../api/instance/authInstance';
import { useNavigate } from 'react-router-dom';
import { getImageSrcAPI } from '../api/apis/image';

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

const getAccountName = () => {
  return localStorage.getItem('accountname');
};

export default function ProfileEditPage() {
  const [accountParams] = useState(getAccountName);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: '',
    accountname: '',
    intro: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'image') {
      const { files } = e.target;
      getImageSrcAPI(files[0]).then(({ filename }) => {
        setInputValue({
          ...inputValue,
          image: `${process.env.REACT_APP_BASE_URL}/${filename}`,
        });
      });
    } else {
      setInputValue({ ...inputValue, [id]: value });
    }
  };

  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: {
          user: { accountname, image },
        },
      } = await authInstance.put('/user', { user: inputValue });
      localStorage.setItem('accountname', accountname);
      localStorage.setItem('image', image);
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const {
        data: {
          profile: { image, username, accountname, intro },
        },
      } = await authInstance.get(`/profile/${accountParams}`);

      setInputValue({ image, username, accountname, intro });
    };
    getData();
  }, []);

  return (
    <>
      <Header type="upload" buttonId="profile-edit" buttonText={'저장'} />
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
