import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50%;
  font-size: ${({ theme }) => theme.fontSizes.base};
  border-bottom: 2px solid black;

  span {
    position: absolute;
    left: 10px;
  }

  input {
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: ${({ theme }) => theme.fontSizes.base};
    text-align: center;
  }
`;

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const delayedCallOnSearch = useCallback(
    debounce((onSearch, keyword) => {
      onSearch(keyword);
    }, 500),
    []
  );

  const handleKeyPress = ({ key }) => {
    if (!keyword) return;
    if (key === 'Enter') onSearch(keyword);

    delayedCallOnSearch.cancel();
  };

  const handleChange = (e) => {
    const currentWord = e.target.value;

    setKeyword(currentWord);
    delayedCallOnSearch(onSearch, currentWord);
  };

  return (
    <Wrapper>
      <span>🔍</span>
      <input
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={keyword}
        placeholder='어떤 상품을 찾고 계세요?'
      />
    </Wrapper>
  );
};

export default Search;
