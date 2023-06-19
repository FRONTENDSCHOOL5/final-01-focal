import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../states/LoginState';

// 인증을 안했을 경우 WelcomePage로, 했을 경우 해당 페이지로
export default function PrivateRoute() {
  const isLogin = useRecoilValue(loginState);

  return isLogin ? <Outlet /> : <Navigate to="/welcome" />;
}
