import React, { cloneElement } from 'react';
import styled from 'styled-components';
import { generateDateToText } from '../utils';
import { TYPE } from '../constants';

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  padding: 50px;

  .mypage__content__title {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 3px solid gray;
  }

  .mypage__contents {
    width: 100%;
    padding: 10px;
    text-align: center;
    box-shadow: ${({ theme }) => theme.boxShadows.default};

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      background-color: ${({ theme }) => theme.colors.bamboo};
      color: white;
    }

    td,
    th {
      display: table-cell;
      vertical-align: middle;
      border: 1px dotted #ddd;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  }
`;

const ContentTable = ({
  auctionsInfo,
  title,
  onClick,
  children,
  isMyAuction,
}) => {
  return (
    <Wrapper>
      <div className='mypage__content__title'>{title}</div>
      <table className='mypage__contents'>
        <thead>
          <tr>
            <th>상품명</th>
            <th>시작 가격</th>
            <th>낙찰 가격</th>
            <th>예약 인원</th>
            <th>등록 일시</th>
            <th>경매 일시</th>
            <th>상태</th>
            <th></th>
          </tr>
        </thead>
        {auctionsInfo?.map(
          ({
            _id,
            itemName,
            initialPrice,
            finalPrice,
            reservedUser,
            created_at,
            startedDateTime,
            isStarted,
            isStartPossible,
            isFinished,
          }) => (
            <tbody key={_id}>
              <tr>
                <td>{itemName}</td>
                <td>{initialPrice}</td>
                <td>{finalPrice ? finalPrice : '-'}</td>
                <td>{reservedUser.length}명</td>
                <td>{generateDateToText(created_at)}</td>
                <td>{generateDateToText(startedDateTime)}</td>
                <td>
                  {(isStartPossible && '경매시간 도달') ||
                    (isFinished && '경매종료') ||
                    (isStarted && '경매시작') ||
                    '경매대기'}
                </td>
                <td>
                  {children.map((button, index) => {
                    const { type } = button.props;

                    let disabledCondition;

                    if (type === TYPE.START) {
                      disabledCondition = !isStartPossible || isStarted;
                    } else if (type === TYPE.MODIFY || type === TYPE.DELETE) {
                      disabledCondition = isStartPossible || isFinished;
                    } else if (type === TYPE.JOIN) {
                      disabledCondition = isFinished || !isStarted;
                    }

                    return cloneElement(button, {
                      key: index,
                      disabled: disabledCondition,
                      onClick: () => onClick(_id, type),
                    });
                  })}
                </td>
              </tr>
            </tbody>
          )
        )}
      </table>
    </Wrapper>
  );
};

export default ContentTable;
