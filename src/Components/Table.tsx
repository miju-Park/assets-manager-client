import React, { useState } from 'react';
import styled from 'styled-components';
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt';
import { Revision } from '@styled-icons/boxicons-regular/Revision';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';
import { AddCircle } from '@styled-icons/ionicons-outline/AddCircle';
import { getAbstractNumber, getPercentage } from '../utils';
import { CURRENCY } from '../types';

const Title = styled.h3`
  margin: 20px 0;
  font-size: 1rem;
`;
const TableContainer = styled.div`
  padding-left: 10px;
  background-color: #27293d;
  display: grid;
  grid-auto-rows: 40px;
  align-items: stretch;
  justify-items: stretch;
`;
const TableHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 70px repeat(8, 1fr);
  column-gap: 1rem;
  border-bottom: 1px solid #fff;
`;
const TableHeader = styled.label`
  font-weight: 800;
  display: flex;
  align-items: center;
`;
const TableContentContainer = styled.div`
  display: grid;
  grid-template-columns: 70px repeat(8, 1fr);
  column-gap: 1rem;
  border-bottom: 1px solid #fff;
  &:hover {
    background-color: #e14eca;
  }
`;
const TableInputContent = styled.input`
  width: 100%;
  display: inline-block;
  font-size: 1rem;
  border: none;
  padding: 0;
  background-color: ${props => (props.disabled ? 'transparent' : 'white')};
  &:focus {
    outline: none;
  }
  color: ${props => (props.disabled ? '#ced4da' : 'black')};
`;
const TableContent = styled.span`
  display: flex;
  align-items: center;
`;
const TableAddColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const IconStyle = styled.span`
  color: white;
  width: 25px;
  height: 25px;
  line-height: 25px;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;
const SummaryContainer = styled.div`
  background-color: #27293d;
  display: grid;
  grid-auto-rows: 40px;
  grid-template-columns: repeat(8, 1fr);
`;
const SummaryTitle = styled.span`
  grid-column: 1/4;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;
const Summary = styled.span`
  justify-content: center;
  display: flex;
  align-items: center;
`;

const data = [
  {
    id: 0,
    title: '현대건설',
    currentPrice: 20000,
    ticker: '452',
    averagePrice: 20000,
    count: 20,
  },
  {
    id: 1,
    title: '삼성전자',
    currentPrice: 20000,
    ticker: '452',
    averagePrice: 20000,
    count: 20,
  },
  {
    id: 2,
    title: '삼성전자',
    currentPrice: 20000,
    ticker: '452',
    averagePrice: 20000,
    count: 20,
  },
];

const Table = () => {
  const [total, changeTotal] = useState({
    current: data.reduce(
      (sum, item) => sum + item.count * item.currentPrice,
      0,
    ),
    average: data.reduce(
      (sum, item) => sum + item.count * item.averagePrice,
      0,
    ),
  });
  const [contents, setContents] = useState(
    data.map(item => ({ ...item, editMode: false })),
  );
  const onToggleEditMode = (index: number): void => {
    setContents(prev =>
      prev.map(item =>
        item.id === index ? { ...item, editMode: !item.editMode } : item,
      ),
    );
  };
  const onRemoveItem = (index: number): void => {
    setContents(prev => prev.filter(item => item.id !== index));
    changeTotal({
      current: contents
        .filter(item => item.id !== index)
        .reduce((sum, item) => sum + item.count * item.currentPrice, 0),
      average: contents
        .filter(item => item.id !== index)
        .reduce((sum, item) => sum + item.count * item.averagePrice, 0),
    });
  };
  const onAddItem = () => {
    const lastId = contents[contents.length - 1].id;
    setContents(prev => [
      ...prev,
      {
        id: lastId + 1,
        title: '',
        currentPrice: 0,
        ticker: '',
        averagePrice: 0,
        count: 0,
        editMode: true,
      },
    ]);
  };
  return (
    <>
      <Title>내역</Title>
      <TableContainer>
        <TableHeaderContainer>
          <TableHeader> #</TableHeader>
          <TableHeader>종목명</TableHeader>
          <TableHeader>종목코드</TableHeader>
          <TableHeader>현재가</TableHeader>
          <TableHeader>매입단가</TableHeader>
          <TableHeader>보유수량</TableHeader>
          <TableHeader>손익률</TableHeader>
          <TableHeader>비중</TableHeader>
          <TableHeader></TableHeader>
        </TableHeaderContainer>
        {contents.map((item, key) => (
          <TableContentContainer key={item.id}>
            <TableContent>{key + 1}</TableContent>
            <TableContent>{item.title}</TableContent>
            <TableContent>{item.ticker}</TableContent>
            <TableContent>{item.currentPrice}</TableContent>
            <TableInputContent
              disabled={!item.editMode}
              value={item.averagePrice}
            />
            <TableInputContent disabled={!item.editMode} value={item.count} />
            <TableContent>{item.count}</TableContent>
            <TableContent>{item.count}</TableContent>
            <TableContent>
              <IconStyle>
                {item.editMode ? (
                  <Revision onClick={() => onToggleEditMode(item.id)} />
                ) : (
                  <EditAlt onClick={() => onToggleEditMode(item.id)} />
                )}
              </IconStyle>
              <IconStyle>
                <DeleteOutline onClick={() => onRemoveItem(item.id)} />
              </IconStyle>
            </TableContent>
          </TableContentContainer>
        ))}
        <TableAddColumn>
          <IconStyle>
            <AddCircle onClick={onAddItem} />
          </IconStyle>
        </TableAddColumn>
      </TableContainer>
      <Title>총합</Title>
      <SummaryContainer>
        <SummaryTitle>총합</SummaryTitle>
        <Summary>{getAbstractNumber(total.current, CURRENCY.KRW)}</Summary>
        <Summary>
          {getPercentage(total.current - total.average, total.average)}
        </Summary>
      </SummaryContainer>
    </>
  );
};
export default Table;
