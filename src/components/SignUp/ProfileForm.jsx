import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileInputContainer from '../ProfileInputContainer/ProfileInputContainer';
import Button from '../Button/Button';
import { baseInstance } from '../../api/baseInstance';

const Form = styled.form`
  & > div:not(:last-child) {
    margin-bottom: 16px;
  }

  & > button {
    display: block;
    margin: 30px auto 0;
  }
`;

export default function ProfileForm({ inputValue, handleChange }) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await baseInstance.post('/user', { user: inputValue });
      const { status } = res;
      if (status !== 200) throw new Error('네트워크 에러');
      else {
        const {
          data: { message },
        } = res;
        if (message !== '회원가입 성공') throw new Error(message);
        else {
          alert('Welcome to Focal!');
          navigate('/login');
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ProfileInputContainer
        inputValue={inputValue}
        handleChange={handleChange}
        setDisabled={setDisabled}
      />
      <Button className="lg" disabled={disabled}>
        Focal 시작하기
      </Button>
    </Form>
  );
}
