import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Card from '../../Components/Card';
import { PiggyBank } from '@styled-icons/fa-solid/PiggyBank';
import { AttachMoney } from '@styled-icons/material-outlined/AttachMoney';
import { types } from '@babel/core';
import { CURRENCY } from '../../types';

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
};

const HomePresenter = ({ total, exchangeRate }: HomeProps) => {
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
          기준일 : {moment(updatedAt).format('YYYY. MM. DD')}
        </DateTitle>
        <IconStyleWrapper>
          <AttachMoney />
        </IconStyleWrapper>
        <Text>{rate}원</Text>
      </Card>
    </Container>
  );
};
export default HomePresenter;
