import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../constants';

const Wrapper = styled.div`

`;

const RegistrationContainer = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push(ROUTES.LOGIN);
  }, [history, isLoggedIn]);

  return (
    <Wrapper>
      <div>상품 정보 등록 페이지입니다!</div>
    </Wrapper>
  );
};

export default RegistrationContainer;
