import React from 'react';
import styled from 'styled-components';
import Card from '../../Components/Card';
import { PiggyBank } from '@styled-icons/fa-solid/PiggyBank';
import { AttachMoney } from '@styled-icons/material-outlined/AttachMoney';

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

const HomePresenter = () => {
  return (
    <Container>
      <Card>
        <Title>총자산</Title>
        <IconStyleWrapper>
          <PiggyBank />
        </IconStyleWrapper>
        <Text>1000만원</Text>
      </Card>
      <Card>
        <Title>환율</Title>
        <DateTitle>2020.09.26 19:41:30</DateTitle>
        <IconStyleWrapper>
          <AttachMoney />
        </IconStyleWrapper>
        <Text>1684.7원</Text>
      </Card>
    </Container>
  );
};
export default HomePresenter;
