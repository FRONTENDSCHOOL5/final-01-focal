import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import TextInput from '../Input/TextInput';
import ProfileImageUploader from '../Input/ProfileImageUploader';
import { accountnameValidAPI } from '../../../api/apis/user';
import { accountnameRegex, validateMessage } from '../../../constants/validate';
import { useDebounce } from '../../../hooks/useDebounce';

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
  const debouncedValue = useDebounce(accountname);

  const [usernameError, setUsernameError] = useState(null);
  const [accountnameError, setAccountnameError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const validateUsername = () => {
    if (!username) {
      setUsernameError(null);
    } else {
      if (username.length >= 2 && username.length <= 10) {
        setUsernameError('');
      } else setUsernameError(validateMessage.usernameLength);
    }
  };

  const validateAccountname = async () => {
    if (!accountnameRegex.test(accountname)) {
      setAccountnameError(validateMessage.accountnamePatterMiss);
      return;
    }

    const { message } = await accountnameValidAPI(accountname);
    if (message === validateMessage.accountnameCorrect) setAccountnameError('');
    else setAccountnameError(message);
  };

  const handleBtnDisabledChange = () => {
    if (usernameError === '' && accountnameError === '') setBtnDisabled(false);
    else setBtnDisabled(true);
  };

  useEffect(() => {
    validateUsername();
  }, [username]);

  useEffect(() => {
    validateAccountname();
  }, [debouncedValue]);

  useEffect(() => {
    handleBtnDisabledChange();
  }, [usernameError, accountnameError]);

  return (
    <Form onSubmit={handleSubmit} id={formId}>
      <ProfileImageUploader value={image} handleChange={handleChange} />
      <TextInput
        id="username"
        placeholder="2~10자 이내여야 합니다."
        value={username}
        onChange={handleChange}
        error={usernameError}
      >
        사용자 이름
      </TextInput>
      <TextInput
        id="accountname"
        placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
        value={accountname}
        onChange={handleChange}
        error={accountnameError}
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
        <Button className="lg" disabled={btnDisabled}>
          Focal 시작하기
        </Button>
      )}
    </Form>
  );
}
