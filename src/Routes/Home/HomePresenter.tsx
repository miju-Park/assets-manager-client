import React from 'react';
import styled from 'styled-components';
import Card from '../../Components/Card';

const Container = styled.div`
  padding: 78px 30px 30px 280px;
  min-height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const HomePresenter = () => {
  console.log('home');
  return (
    <Container>
      <Card title="총 자산">1000만원</Card>
    </Container>
  );
};
export default HomePresenter;
