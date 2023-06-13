import React from 'react';
import ProfileImageUploader from './ProfileImageUploader';
import TextInput from '../Input/TextInput';

export default function ProfileInputContainer() {
  return (
    <>
      <ProfileImageUploader />
      <TextInput id="username" placeholder="2~10자 이내여야 합니다.">
        사용자 이름
      </TextInput>
      <TextInput
        id="accountname"
        placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
      >
        계정 ID
      </TextInput>
      <TextInput
        id="intro"
        placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
      >
        소개
      </TextInput>
    </>
  );
}
