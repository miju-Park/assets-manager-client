import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Card from '../../Components/Card';
import { PiggyBank } from '@styled-icons/fa-solid/PiggyBank';
import { AttachMoney } from '@styled-icons/material-outlined/AttachMoney';
import { types } from '@babel/core';
import { CURRENCY } from '../../types';
import PieChart from '../../Components/PieChart';

const IconStyleWrapper = styled.div`
  align-self: center;
  margin: 10px 0 30px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  color: #ba54f5;
`;

const Container = styled.div`
  padding: 78px 30px 30px 280px;
  min-height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
`;
const Title = styled.div`
  color: #ced4da;
  position: absolute;
`;
const DateTitle = styled.div`
  position: absolute;
  right: 0;
  color: #ced4da;
  font-size: 0.7rem;
  right: 20px;
`;
const Text = styled.div`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  font-weight: bold;
`;

export type HomeProps = {
  total: string;
  exchangeRate: {
    exchangeRate: number;
    updatedAt: string;
  };
  summaryItem: {
    id: string;
    value: number;
    label: string;
  }[];
};

const HomePresenter = ({ total, exchangeRate, summaryItem }: HomeProps) => {
  const { exchangeRate: rate, updatedAt } = exchangeRate;
  return (
    <Container>
      <Card>
        <Title>총자산</Title>
        <IconStyleWrapper>
          <PiggyBank />
        </IconStyleWrapper>
        <Text>{total}</Text>
      </Card>
      <Card>
        <Title>환율</Title>
        <DateTitle>
          기준일 :{' '}
          {updatedAt !== '-' ? moment(updatedAt).format('YYYY. MM. DD') : '-'}
        </DateTitle>
        <IconStyleWrapper>
          <AttachMoney />
        </IconStyleWrapper>
        <Text>{rate}원</Text>
      </Card>
      <Card>
        <Title>자산비율</Title>
        <PieChart
          data={summaryItem}
          margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
        />
      </Card>
    </Container>
  );
};

HomePresenter.defaultProps = {
  total: '',
  exchangeRate: {
    exchangeRate: 0,
    updatedAt: '-',
  },
  summaryItem: [],
};
export default HomePresenter;
