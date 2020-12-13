import React from 'react';
import styled from 'styled-components';

const StyldInput = styled.input`
  width: 65%;
  border: none;
  border-bottom: 2px solid gray;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const ChatInput = ({ disabled, onChange, onKeyPress, value }) => {
  return (
    <StyldInput
      placeholder={'메시지 입력하기'}
      onKeyPress={disabled ? null : onKeyPress}
      onChange={onChange}
      value={value}
    />
  );
};

export default ChatInput;
