import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import styled from 'styled-components';
import Button from '../components/Button';
import { ROUTES, ITEM_CATEGORY } from '../constants';
import { createAuction } from '../redux/auction/auction.reducer';
import Loading from '../components/Loading';

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
      border: 1.5px solid #3f4257;
      border-radius: 3px;
      width: 100%;
      box-shadow: ${({ theme }) => theme.boxShadows.default};
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 40%;
  max-width: 350px;
  min-width: 300px;
`;

const RegisterationContainer = () => {
  const [title, setTitle] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState(ITEM_CATEGORY[0]);
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);
  const [initalPrice, setInitalPrice] = useState('');
  const [startedDateTime, setStartedDateTime] = useState('');
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auctions.isLoading);
  const history = useHistory();

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
      initalPrice,
      startedDateTime,
    };

    dispatch(createAuction(payload));
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loading type='spokes' color='black' />
      ) : (
        <>
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
                    value={initalPrice}
                    onChange={(e) => setInitalPrice(e.target.value)}
                    placeholder={0}
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
          <ButtonWrapper >
            <Button onClick={handleRegister} text={'경매 등록하기'} />
            <Button onClick={handleGoBack} text={'뒤로 돌아가기'} />
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default RegisterationContainer;
