import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import BasicLayout from '../layouts/Layout/BasicLayout';

export default function LoginPage() {
  return (
    <>
      <BasicLayout
        headerProps={{ title: '로그인' }}
        description="이메일, 비밀번호 입력"
      >
        <LoginForm />
        <Link to="/signup" className="signup-link">
          이메일로 회원가입
        </Link>
      </BasicLayout>
    </>
  );
}
