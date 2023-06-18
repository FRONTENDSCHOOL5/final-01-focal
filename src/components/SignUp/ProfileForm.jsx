import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import TextInput from '../Input/TextInput';
import ProfileImageUploader from '../Input/ProfileImageUploader';
import baseInstance from '../../api/instance/baseInstance';

const Form = styled.form`
  & > div:not(:last-child) {
    margin-bottom: 16px;
  }

  & > button {
    display: block;
    margin: 30px auto 0;
  }
`;

export default function ProfileForm({
  type,
  inputValue: { image, username, accountname, intro },
  handleChange,
  handleSubmit,
  formId,
}) {
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({
    usernameError: null,
    accountnameError: null,
  });

  const usernameValidate = () => {
    if (username.length < 2 || username.length > 10)
      setError({ ...error, usernameError: '2자~10자 이내여야 합니다' });
    else setError({ ...error, usernameError: '' });
  };

  const accountnameValidate = async () => {
    const accountnameRegex = /^[a-zA-Z0-9._]+$/;
    if (!accountnameRegex.test(accountname))
      setError({
        ...error,
        accountnameError: '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.',
      });
    else {
      try {
        const res = await baseInstance.post('/user/accountnamevalid', {
          user: { accountname },
        });
        const {
          data: { message },
          status,
        } = res;

        if (status !== 200) throw new Error('네트워크 오류');
        if (status === 200) {
          if (message === '사용 가능한 계정ID 입니다.')
            setError({ ...error, accountnameError: '' });
          else if (message === '이미 가입된 계정ID 입니다.')
            setError({ ...error, accountnameError: message });
          else throw new Error(message);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  useEffect(() => {
    if (username && accountname) {
      const { usernameError, accountnameError } = error;
      if (usernameError === '' && accountnameError === '') setDisabled(false);
      else setDisabled(true);
    } else setDisabled(true);
  }, [error.usernameError, error.accountnameError]);

  return (
    <Form onSubmit={handleSubmit} id={formId}>
      <ProfileImageUploader value={image} handleChange={handleChange} />
      <TextInput
        id="username"
        placeholder="2~10자 이내여야 합니다."
        value={username}
        onChange={handleChange}
        validate={usernameValidate}
        error={error.usernameError}
      >
        사용자 이름
      </TextInput>
      <TextInput
        id="accountname"
        placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
        value={accountname}
        onChange={handleChange}
        validate={accountnameValidate}
        error={error.accountnameError}
      >
        계정 ID
      </TextInput>
      <TextInput
        id="intro"
        placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
        value={intro}
        onChange={handleChange}
      >
        소개
      </TextInput>

      {type === 'signup' && (
        <Button className="lg" disabled={disabled}>
          Focal 시작하기
        </Button>
      )}
    </Form>
  );
}
