import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import TextInput from '../Common/Input/TextInput';
import Button from '../Common/Button/Button';
import { emailValidAPI } from '../../api/apis/user';
import { emailRegex, validateMessage } from '../../constants/validate';
import { useDebounce } from '../../hooks/useDebounce';

const Form = styled.form`
  & > div:first-child {
    margin-bottom: 16px;
  }

  & > div:nth-child(2) {
    margin-bottom: 30px;
  }

  & > button {
    display: block;
    margin: 0 auto;
  }
`;
export default function SignUpForm({
  handleClickButton,
  inputValue: { email, password },
  handleChange,
}) {
  const debouncedValue = useDebounce(email);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const validateEmail = useCallback(async () => {
    if (!email) {
      setEmailError(null);
    } else {
      if (!emailRegex.test(email)) {
        setEmailError(validateMessage.emailPatternMiss);
        return;
      }

      const { message } = await emailValidAPI(email);
      if (message === validateMessage.emailCorrect) setEmailError('');
      else setEmailError(message);
    }
  }, [debouncedValue]);

  const validatePassword = useCallback(() => {
    if (!password) {
      setPasswordError(null);
    } else {
      if (password.length < 6) {
        setPasswordError(validateMessage.passwordLength);
      } else {
        setPasswordError('');
      }
    }
  }, [password]);

  const handleBtnDisabledChange = () => {
    if (emailError === '' && passwordError === '') {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  useEffect(() => {
    validateEmail();
  }, [debouncedValue]);

  useEffect(() => {
    validatePassword();
  }, [password]);

  useEffect(() => {
    handleBtnDisabledChange();
  }, [emailError, passwordError]);

  return (
    <Form>
      <TextInput
        id="email"
        type="email"
        placeholder="이메일 주소를 입력해주세요"
        value={email}
        onChange={handleChange}
        error={emailError}
      >
        이메일
      </TextInput>
      <TextInput
        id="password"
        type="password"
        placeholder="비밀번호를 설정해주세요"
        value={password}
        onChange={handleChange}
        error={passwordError}
      >
        비밀번호
      </TextInput>

      <Button
        type="button"
        className="lg"
        onClick={handleClickButton}
        disabled={btnDisabled}
      >
        다음
      </Button>
    </Form>
  );
}
