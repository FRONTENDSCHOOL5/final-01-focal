import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post/" element={<Outlet />}>
          <Route path=":post_id" element={<PostPage />} />
          <Route path="upload" element={<PostUploadPage />} />
        </Route>
        <Route path="/profile/" element={<Outlet />}>
          <Route path="" element={<MyProfilePage />} />
          <Route path=":_id" element={<UserProfilePage />} />
        </Route>
        <Route path="/follow/:_id/" element={<Outlet />}>
          <Route path="follower" element={<FollowersPage />} />
          <Route path="following" element={<FollowingsPage />} />
        </Route>
        <Route path="/product" element={<ProductUploadPage />} />
        <Route path="/chat/" element={<Outlet />}>
          <Route path="list" element={<ChatListPage />} />
          <Route path=":_id" element={<ChatRoomPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
