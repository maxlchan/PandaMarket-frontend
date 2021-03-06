import React from 'react';
import PropTypes from 'prop-types';
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
      spellCheck={false}
      placeholder={'메시지 입력하기'}
      onKeyPress={disabled ? null : onKeyPress}
      onChange={onChange}
      value={value}
    />
  );
};

ChatInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default ChatInput;
