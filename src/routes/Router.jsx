import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';
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
import PostEditPage from '../pages/PostEditPage';
import ProductEditPage from '../pages/ProductEditPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
        <Route element={<PublicRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/post/" element={<Outlet />}>
            <Route path=":post_id" element={<PostPage />} />
            <Route path="upload" element={<PostUploadPage />} />
            <Route path=":post_id/edit" element={<PostEditPage />} />
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
          <Route path="/product/" element={<Outlet />}>
            <Route path="" element={<ProductUploadPage />} />
            <Route
              path="/product/:product_id/edit"
              element={<ProductEditPage />}
            />
          </Route>
          <Route path="/chat/" element={<Outlet />}>
            <Route path="" element={<ChatListPage />} />
            <Route path=":_id" element={<ChatRoomPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>

        {/* <Route path="/splash" element={<SplashPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
