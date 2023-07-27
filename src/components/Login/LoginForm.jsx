import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../Common/Input/TextInput';
import Button from '../Common/Button/Button';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../states/LoginState';
import { loginAPI } from '../../api/apis/user';

const Form = styled.form`
  margin-bottom: 20px;
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

export default function LoginForm() {
  const setIsLogined = useSetRecoilState(loginState);
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue({ ...inputValue, [id]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    loginAPI(inputValue).then(({ user, message }) => {
      if (!user) {
        setError(message);
      } else {
        setError('');
        localStorage.setItem('accountname', user.accountname);
        localStorage.setItem('image', user.image);
        localStorage.setItem('token', user.token);
        setIsLogined(true);
      }
    });
  };

  useEffect(() => {
    const { email, password } = inputValue;
    if (email && password) setDisabled(false);
    else setDisabled(true);
  }, [inputValue.email, inputValue.password]);

  return (
    <Form onSubmit={handleFormSubmit}>
      <TextInput
        id="email"
        type="email"
        value={inputValue.email}
        onChange={handleInputChange}
      >
        이메일
      </TextInput>
      <TextInput
        id="password"
        type="password"
        value={inputValue.password}
        onChange={handleInputChange}
        error={error}
      >
        비밀번호
      </TextInput>
      <Button className="lg" disabled={disabled}>
        로그인
      </Button>
    </Form>
  );
}
