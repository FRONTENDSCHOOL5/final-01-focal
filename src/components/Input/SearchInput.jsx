import React from 'react';
import styled from 'styled-components';

const SearchInputBox = styled.form`
  width: 100%;
  margin-left: 20px;

  input {
    width: 100%;
    border-radius: 4px;
    background-color: #f2f2f2;
    padding: 7px 16px;
    font-size: 14px;
    outline: none;
  }
`;

export default function SearchInput() {
  return (
    <SearchInputBox>
      <label htmlFor="search" className="a11y-hidden">
        계정 검색
      </label>
      <input id="search" type="text" placeholder="계정 검색" />
    </SearchInputBox>
  );
}
