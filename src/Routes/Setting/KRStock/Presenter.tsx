import React from 'react';
import styled from 'styled-components';
import Table from '../../../Components/Table';

const Container = styled.div`
  padding: 78px 30px 30px 280px;
  min-height: calc(100vh - 70px);
`;

const PageTitle = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
`;
const TableContainer = styled.div`
  margin-top: 30px;
`;

const KRStockPresenter = () => {
  return (
    <Container>
      <PageTitle>국내주식 내역</PageTitle>
      <TableContainer>
        <Table />
      </TableContainer>
    </Container>
  );
};
export default KRStockPresenter;
