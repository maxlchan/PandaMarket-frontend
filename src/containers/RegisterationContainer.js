import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import styled from 'styled-components';
import Button from '../components/Button';
import { ROUTES, ITEM_CATEGORY } from '../constants';
import { createAuction } from '../redux/auction/auction.reducer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;

  .box__register {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px 0px;
    width: 90%;
    max-width: 1000px;
    background-color: white;
    box-shadow: ${({ theme }) => theme.boxShadows.default};

    .title__register {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80px;
      box-shadow: ${({ theme }) => theme.boxShadows.default};
      font-size: ${({ theme }) => theme.fontSizes.base};
      font-weight: ${({ theme }) => theme.fontWeights.strong};
    }

    .contents__register {
      padding: 20px 0;
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
      border: 2px solid #3f4257;
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
  const [category, setCategory] = useState(ITEM_CATEGORY[0]);
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);
  const [initPrice, setInitPrice] = useState(0);
  const [startedDateTime, setStartedDateTime] = useState('');
  const { isLoggedIn, info } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const myAutions = info.myAuctions;

  useEffect(() => {
    if (!isLoggedIn) history.push(ROUTES.LOGIN);
  }, [history, isLoggedIn]);

  const handleRegister = () => {
    const payload = {
      title,
      itemName,
      category,
      pictures,
      description,
      initPrice,
      startedDateTime,
    };

    dispatch(createAuction(payload));

    history.push(ROUTES.HOME);
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
              <ImageUploader
                label={'사진을 등록해주세요'}
                withPreview={true}
                withIcon={true}
                onChange={(picture) => setPictures(picture)}
                maxFileSize={5242880}
              />
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
                placeholder={'OO물건 경매합니다.형식으로 적어주세요'}
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
                placeholder={'상품명을 입력해주세요'}
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
