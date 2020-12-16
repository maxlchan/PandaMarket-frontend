import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { CONFIG } from '../constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50%;
  font-size: ${({ theme }) => theme.fontSizes.base};
  border-bottom: 2px solid black;

  .serach__image {
    position: absolute;
    left: 10px;
  }

  .serach__input {
    width: 100%;
    border: none;
    font-size: ${({ theme }) => theme.fontSizes.base};
    background-color: transparent;
    text-align: center;
  }
`;

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const debouncedCallOnSearch = useCallback(
    debounce((onSearch, keyword) => onSearch(keyword), CONFIG.DEBOUNCED_TIME),
    []
  );

  const handleKeyPress = (e) => {
    if (!keyword) return;
    if (e.key === 'Enter') onSearch(keyword);

    debouncedCallOnSearch.cancel();
  };

  const handleChange = (e) => {
    const currentWord = e.target.value;

    setKeyword(currentWord);
    debouncedCallOnSearch(onSearch, currentWord);
  };

  return (
    <Wrapper>
      <span className='serach__image'>🔍</span>
      <input
        className='serach__input'
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={keyword}
        placeholder='어떤 상품을 찾고 계세요?'
      />
    </Wrapper>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
