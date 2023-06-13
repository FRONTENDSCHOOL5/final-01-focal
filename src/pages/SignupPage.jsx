import React from 'react';
import TitleHeader from '../components/Header/TitleHeader';
import SignUpForm from '../components/SignUp/SignUpForm';

export default function SignupPage() {
  return (
    <>
      <TitleHeader>이메일로 회원가입</TitleHeader>
      <SignUpForm />
    </>
  );
}
