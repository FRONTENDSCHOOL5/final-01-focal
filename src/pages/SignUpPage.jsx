import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../layouts/Header/TitleHeader';
import SignUpForm from '../components/SignUp/SignUpForm';
import ProfileForm from '../components/Common/ProfileForm/ProfileForm';
import baseInstance from '../api/instance/baseInstance';
import { signupAPI } from '../api/apis/user';

const Main = styled.main`
  width: 100%;
  & > section {
    max-width: 322px;
    width: calc(100% - 34px * 2);
    margin: 0 auto;

    & > button {
      display: block;
      margin: 30px auto 0;
    }
  }
`;

const initialValue = {
  email: '',
  password: '',
  username: '',
  accountname: '',
  intro: '',
  image: '',
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(initialValue);
  const [showSecondPage, setShowSecondPage] = useState(false);

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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await signupAPI(inputValue);
      if (message === '회원가입 성공') {
        alert('Welcome to Focal!');
        navigate('/login');
      }
    } catch (err) {
      alert(err + ' 다시 입력해주세요');
      setShowSecondPage(false);
      setInputValue(initialValue);
    }
  };

  return (
    <>
      {!showSecondPage ? (
        <>
          <TitleHeader>이메일로 회원가입</TitleHeader>
          <Main>
            <section>
              <h2 className="a11y-hidden">이메일, 비밀번호 입력</h2>
              <SignUpForm
                handleClickButton={() => {
                  setShowSecondPage(true);
                }}
                inputValue={inputValue}
                handleChange={handleInputChange}
              />
            </section>
          </Main>
        </>
      ) : (
        <>
          <TitleHeader subText="나중에 언제든지 변경할 수 있습니다.">
            프로필 설정
          </TitleHeader>
          <Main>
            <section>
              <h2 className="a11y-hidden">
                사용자이름, 계정ID, 소개 작성 컨테이너
              </h2>
              <ProfileForm
                type="signup"
                inputValue={inputValue}
                handleChange={handleInputChange}
                handleSubmit={handleSignUpSubmit}
              />
            </section>
          </Main>
        </>
      )}
    </>
  );
}
