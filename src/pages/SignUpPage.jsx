import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../layouts/Layout/BasicLayout';
import SignUpForm from '../components/SignUp/SignUpForm';
import ProfileForm from '../components/Common/ProfileForm/ProfileForm';
import { getImageSrcAPI } from '../api/apis/image';
import { signupAPI } from '../api/apis/user';
import useModal from '../hooks/useModal';
import BasicModal from '../layouts/Modal/BasicModal';

const initialValue = {
  email: '',
  password: '',
  username: '',
  accountname: '',
  intro: '',
  image: '',
};

export default function SignupPage() {
  const [inputValue, setInputValue] = useState(initialValue);
  const [step, setStep] = useState('이메일,비밀번호');
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleInputChange = async (e) => {
    const { id, value } = e.target;
    if (id !== 'image') setInputValue({ ...inputValue, [id]: value });
    else {
      const { files } = e.target;
      const { filename } = await getImageSrcAPI(files[0]);
      setInputValue({
        ...inputValue,
        image: `${process.env.REACT_APP_BASE_URL}/${filename}`,
      });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const { message } = await signupAPI(inputValue);
      if (message === '회원가입 성공') {
        openModal();
      }
    } catch (err) {
      alert(err + ' 다시 입력해주세요');
      setStep('이메일,비밀번호');
    }
  };

  return (
    <>
      {step === '이메일,비밀번호' && (
        <BasicLayout
          headerProps={{ title: '이메일로 회원가입' }}
          description={'이메일, 비밀번호 입력'}
        >
          <SignUpForm
            handleClickButton={() => {
              setStep('프로필설정');
            }}
            inputValue={inputValue}
            handleChange={handleInputChange}
          />
        </BasicLayout>
      )}
      {step === '프로필설정' && (
        <BasicLayout
          headerProps={{
            title: '이메일로 회원가입',
            subText: '나중에 언제든지 변경할 수 있습니다.',
          }}
          description={'이메일, 비밀번호 입력'}
        >
          <ProfileForm
            type="signup"
            inputValue={inputValue}
            handleChange={handleInputChange}
            handleSubmit={handleSignUpSubmit}
          />
          {isModalOpen && (
            <BasicModal
              closeModal={() => {
                closeModal();
                navigate('/welcome');
              }}
            >
              <b> {inputValue.username}</b>님의 <br /> 회원가입이
              완료되었습니다.
            </BasicModal>
          )}
        </BasicLayout>
      )}
    </>
  );
}
