import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../Common/Input/TextInput';
import Button from '../Common/Button/Button';
import { emailValidAPI } from '../../api/apis/user';

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
  const [error, setError] = useState({
    emailError: null,
    passwordError: null,
  });
  const [disabled, setDisabled] = useState(true);

  const emailValidate = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError({ ...error, emailError: '올바르지 않은 이메일 형식입니다.' });
    } else {
      emailValidAPI(email).then(({ message }) => {
        if (message === '사용 가능한 이메일 입니다.')
          setError({ ...error, emailError: '' });
        else setError({ ...error, emailError: message });
      });
    }
  };

  const passwordValidate = () => {
    if (password.length < 6) {
      setError({
        ...error,
        passwordError: '비밀번호는 6자 이상이어야 합니다.',
      });
    } else {
      setError({ ...error, passwordError: '' });
    }
  };

  useEffect(() => {
    if (email && password) {
      const { emailError, passwordError } = error;
      if (emailError === '' && passwordError === '') {
        setDisabled(false);
      } else setDisabled(true);
    } else setDisabled(true);
  }, [error.emailError, error.passwordError]);

  return (
    <Form>
      <TextInput
        id="email"
        type="email"
        placeholder="이메일 주소를 입력해주세요"
        validate={emailValidate}
        value={email}
        onChange={handleChange}
        error={error.emailError}
      >
        이메일
      </TextInput>
      <TextInput
        id="password"
        type="password"
        placeholder="비밀번호를 설정해주세요"
        validate={passwordValidate}
        value={password}
        onChange={handleChange}
        error={error.passwordError}
      >
        비밀번호
      </TextInput>

      <Button
        type="button"
        className="lg"
        onClick={handleClickButton}
        disabled={disabled}
      >
        다음
      </Button>
    </Form>
  );
}
