import React from 'react';
import styled from 'styled-components';

const StyldInput = styled.input`
  width: 70%;
  border: none;
  border-bottom: 2px solid gray;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const ChatInput = ({ onChange, onKeyPress, value }) => {
  return (
    <StyldInput
      placeholder={'메시지 입력하기'}
      onKeyPress={onKeyPress}
      onChange={onChange}
      value={value}
    />
  );
};

export default ChatInput;
