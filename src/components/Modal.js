import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import usePreventScroll from '../hooks/usePreventScroll';

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContents = styled.div`
  position: relative;
  width: 70vw;
  padding: 40px 20px;
  z-index: 1000;
  background-color: #f2f1ef;
  box-shadow: ${({ theme }) => theme.boxShadows.deep};
  border-radius: 10px;
`;

const Modal = ({ onClick, children }) => {
  usePreventScroll();

  return (
    <>
      <ModalOverlay />
      <ModalWrapper onClick={onClick}>
        <ModalContents onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalContents>
      </ModalWrapper>
    </>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
