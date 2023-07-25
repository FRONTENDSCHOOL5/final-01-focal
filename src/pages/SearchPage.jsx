import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import authInstance from '../api/instance/authInstance';
import Header from '../layouts/Header/Header';
import UserSearchListItem from '../components/Search/UserSearchListItem';
import NavBar from '../layouts/NavBar/NavBar';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 108px);
  overflow-y: auto;
  margin-top: 48px;
  padding: 20px 16px;

  & > section {
    & > ul li:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export default function SearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);

  const getData = async () => {
    if (inputValue) {
      try {
        const res = await authInstance.get(
          `/user/searchuser/?keyword=${inputValue}`,
        );
        const { data } = res;
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <>
      <Header
        type="search"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Main>
        <section>
          <h2 className="a11y-hidden">검색 리스트 결과</h2>
          <ul>
            {users.map((user) => (
              <UserSearchListItem
                key={user._id}
                user={user}
                searchQuery={inputValue}
              />
            ))}
          </ul>
        </section>
      </Main>
      <NavBar />
    </>
  );
}
