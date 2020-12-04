import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { ROUTES, ITEM_CATEGORY } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .box__register {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px 0px;
    width: 90%;
    height: 600px;
    background-color: white;
    box-shadow: ${({ theme }) => theme.boxShadows.default};

    .title__register {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 10%;
      box-shadow: ${({ theme }) => theme.boxShadows.default};
      font-size: ${({ theme }) => theme.fontSizes.base};
    }

    .contents__register {
      width: 80%;
    }
  }
`;

const RegisterContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;

  .contents__register__title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
  }
  .contents__register__payload {
    display: flex;
    justify-content: center;
    width: 70%;

    input,
    textarea,
    select {
      border: 2px solid gray;
      border-radius: 5px;
      width: 100%;
    }

    input,
    select {
      height: 30px;
      text-align: center;
    }

    textarea {
      height: 100px;
      resize: none;
    }
  }
`;

const RegisterationContainer = () => {
  const [title, setTitle] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState([]);
  const [initPrice, setInitPrice] = useState(0);
  const [startedDateTime, setStartedDateTime] = useState('');
  const { isLoggedIn } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push(ROUTES.LOGIN);
  }, [history, isLoggedIn]);

  const handleRegister = () => {
    console.log(title);
    console.log(itemName);
    console.log(category);
    console.log(description);
    console.log(initPrice);
    console.log(startedDateTime);
  };

  return (
    <Wrapper>
      <div className='box__register'>
        <div className='title__register'>
          <h1>경매 상품 등록</h1>
        </div>
        <div className='contents__register'>
          <RegisterContent>
            <div className='contents__register__title'>
              <h2>상품사진</h2>
            </div>
            <div className='contents__register__payload'>
              <input type='file' />
            </div>
          </RegisterContent>
          <RegisterContent>
            <div className='contents__register__title'>
              <h2>경매 제목</h2>
            </div>
            <div className='contents__register__payload'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </RegisterContent>
          <RegisterContent>
            <div className='contents__register__title'>
              <h2>상품명</h2>
            </div>
            <div className='contents__register__payload'>
              <input
                type='text'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
          </RegisterContent>
          <RegisterContent>
            <div className='contents__register__title'>
              <h2>카테고리</h2>
            </div>
            <div className='contents__register__payload'>
              <select
                onChange={(e) => setCategory(e.target.value)}
                name='category'
              >
                {ITEM_CATEGORY.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </RegisterContent>
          <RegisterContent>
            <div className='contents__register__title'>
              <h2>상품설명</h2>
            </div>
            <div className='contents__register__payload'>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </RegisterContent>
          <RegisterContent>
            <div className='contents__register__title'>
              <h2>시작가격</h2>
            </div>
            <div className='contents__register__payload'>
              <input
                type='number'
                value={initPrice}
                onChange={(e) => setInitPrice(e.target.value)}
              />
            </div>
            원
          </RegisterContent>
          <RegisterContent>
            <div className='contents__register__title'>
              <h2>경매일시</h2>
            </div>
            <div className='contents__register__payload'>
              <input
                type='datetime-local'
                onChange={(e) => setStartedDateTime(e.target.value)}
                value={startedDateTime}
              />
            </div>
          </RegisterContent>
        </div>
      </div>
      <Button onClick={handleRegister} text={'경매 등록하기'} />
    </Wrapper>
  );
};

export default RegisterationContainer;
