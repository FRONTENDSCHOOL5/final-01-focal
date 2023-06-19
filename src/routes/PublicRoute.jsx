import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../states/LoginState';

// 인증을 안했을 경우 해당 페이지로, 인증을 한 상태일 경우 homePage로
export default function PublicRoute() {
  const isLogin = useRecoilValue(loginState);

  return !isLogin ? <Outlet /> : <Navigate to="/" />;
}
