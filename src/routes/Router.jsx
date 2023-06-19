import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../states/LoginState';
import SplashPage from '../pages/SplashPage';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import SearchPage from '../pages/SearchPage';
import MyProfilePage from '../pages/MyProfilePage';
import ChatListPage from '../pages/ChatListPage';
import ChatRoomPage from '../pages/ChatRoomPage';
import PostPage from '../pages/PostPage';
import UserProfilePage from '../pages/UserProfilePage';
import FollowersPage from '../pages/FollowersPage';
import FollowingsPage from '../pages/FollowingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostUploadPage from '../pages/PostUploadPage';
import ProductUploadPage from '../pages/ProductUploadPage';
import ProfileEditPage from '../pages/ProfileEditPage';
import WelcomePage from '../pages/WelcomePage';

export default function Router() {
  const isLogined = useRecoilValue(loginState);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogined ? <HomePage /> : <Navigate replace={true} to="/welcome" />
          }
        />
        <Route
          path="/welcome"
          element={
            !isLogined ? <WelcomePage /> : <Navigate replace={true} to="/" />
          }
        />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/login"
          element={
            !isLogined ? <LoginPage /> : <Navigate replace={true} to="/" />
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post/" element={<Outlet />}>
          <Route path=":post_id" element={<PostPage />} />
          <Route path="upload" element={<PostUploadPage />} />
        </Route>
        <Route path="/profile/" element={<Outlet />}>
          <Route path="" element={<MyProfilePage />} />
          <Route path=":_id" element={<UserProfilePage />} />
          <Route path="edit" element={<ProfileEditPage />} />
        </Route>
        <Route path="/follow/:_id/" element={<Outlet />}>
          <Route path="follower" element={<FollowersPage />} />
          <Route path="following" element={<FollowingsPage />} />
        </Route>
        <Route path="/product" element={<ProductUploadPage />} />
        <Route path="/chat/" element={<Outlet />}>
          <Route path="" element={<ChatListPage />} />
          <Route path=":_id" element={<ChatRoomPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
