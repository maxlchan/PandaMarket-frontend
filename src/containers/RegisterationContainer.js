import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import DateTimePicker from 'react-datetime-picker';
import styled from 'styled-components';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { createAuction } from '../redux/auction/auction.reducer';
import {
  unitizedValue,
  makeStringToNumber,
  checkIsOverOneHour,
} from '../utils';
import { ROUTES, ITEM_CATEGORY, TYPE } from '../constants';

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
    width: 60%;
    max-width: 1000px;
    border-radius: 20px;
    box-shadow: ${({ theme }) => theme.boxShadows.default};
    background-color: white;
    overflow: hidden;

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
      width: 80%;
      padding: 20px 0;
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
    align-items: center;
    width: 70%;

    .deleteImage {
      width: 37px;
      height: 30px;
      padding-top: 5px;
    }

    input,
    textarea,
    select {
      border: 1px solid gray;
      width: 100%;
      padding-left: 10px;
      height: 30px;
    }

    .itemname,
    .startedDateTime,
    .initialprice {
      width: 50%;
    }

    .category {
      width: 30%;
    }

    .description {
      height: 120px;
      resize: none;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  width: 50%;

  .contents__button {
    margin: 0 5px;
  }
`;

const RegisterationContainer = () => {
  const [title, setTitle] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState(ITEM_CATEGORY[0]);
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);
  const [initialPrice, setInitialPrice] = useState('');
  const [startedDateTime, setStartedDateTime] = useState(new Date());
  const { isLoggedIn } = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.auctions.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push(ROUTES.LOGIN);
  }, [history, isLoggedIn]);

  const validateRegisteredData = () => {
    const PICTURES_LENGTH = pictures.length;
    const isLowerThanThousand = makeStringToNumber(initialPrice) < 1000;
    const isLowerThanOneHour = !checkIsOverOneHour(startedDateTime);

    if (PICTURES_LENGTH < 1) return alert('최소 1장의 사진을 등록해주세요');
    if (PICTURES_LENGTH > 5) return alert('사진은 최대 5개만 등록됩니다');
    if (!title) return alert('경매 제목을 입력해주세요');
    if (!itemName) return alert('상품명을 입력해주세요');
    if (!description) return alert('상품 설명을 입력해주세요');
    if (!initialPrice) return alert('시작 가격을 입력해주세요');
    if (!startedDateTime) return alert('경매 일시를 입력해주세요');
    if (isLowerThanThousand) return alert('최소 1,000원 이상을 입력해주세요');
    if (isLowerThanOneHour) return alert('최소 1시간 후의 시간을 등록해주세요');

    return true;
  };

  const handleRegister = (registeredType) => {
    const isValid = validateRegisteredData();
    if (!isValid) return;

    const registeredData = {
      title,
      itemName,
      category,
      pictures,
      description,
      initialPrice,
      startedDateTime,
    };

    dispatch(createAuction({ type: registeredType, payload: registeredData }));
  };

  const handleInitialPriceChange = (value) => {
    if (value === '') return setInitialPrice(value);

    const unitizedNumber = unitizedValue(value);
    if (!unitizedNumber) return;

    setInitialPrice(unitizedNumber);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loading type={TYPE.LOADING} color='black' />
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
                    label={'최대 5개 사진을 등록해주세요'}
                    withPreview={true}
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
                    spellCheck={false}
                    className='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={'경매 제목을 입력해주세요'}
                  />
                </div>
              </RegisterContent>
              <RegisterContent>
                <div className='contents__register__title'>
                  <h2>상품명</h2>
                </div>
                <div className='contents__register__payload'>
                  <input
                    spellCheck={false}
                    className='itemname'
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
                    className='category'
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
                    spellCheck={false}
                    className='description'
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
                    className='initialprice'
                    value={initialPrice}
                    onChange={(e) => handleInitialPriceChange(e.target.value)}
                    placeholder={'1,000원 이상으로 입력해주세요'}
                    maxLength='10'
                  />
                  원
                </div>
              </RegisterContent>
              <RegisterContent>
                <div className='contents__register__title'>
                  <h2>경매일시</h2>
                </div>
                <DateTimePicker
                  minDate={new Date()}
                  maxDetail='hour'
                  disableClock={true}
                  onChange={setStartedDateTime}
                  value={startedDateTime}
                />
              </RegisterContent>
            </div>
          </div>
          <ButtonWrapper>
            <Button
              className='contents__button'
              onClick={(e) => handleRegister(e.target.id)}
              id={TYPE.START}
              text={'경매 바로 시작'}
            />
            <Button
              className='contents__button'
              onClick={(e) => handleRegister(e.target.id)}
              id={TYPE.REGISTER}
              text={'경매 등록하기'}
            />
            <Button
              className='contents__button'
              onClick={() => history.goBack()}
              text={'뒤로 돌아가기'}
            />
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default RegisterationContainer;
