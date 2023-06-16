import React from 'react';
import Header from '../components/Header/Header';
import PostUpload from '../components/Post/PostUpload';

export default function ProductUploadPage() {
  return (
    <>
      <Header type="upload" />
      <PostUpload />
    </>
  );
}
