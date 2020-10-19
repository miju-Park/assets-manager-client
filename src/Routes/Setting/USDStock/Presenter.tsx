import React from 'react';
import styled from 'styled-components';
import Table from '../../../Components/Table';
import { useRecoilValue } from 'recoil';
import { StockTableProps } from '../../../types';
import { usdStockState, usdStockSummary } from '../../atoms';

const TableContainer = styled.div`
  margin-top: 30px;
  position: relative;
`;
const Container = styled.div`
  padding: 78px 30px 30px 280px;
  min-height: calc(100vh - 70px);
`;

const PageTitle = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
`;

const USDStockPresenter = ({ onAdd, onRemove, onUpdate }: StockTableProps) => {
  const summary = useRecoilValue(usdStockSummary);
  return (
    <Container>
      <PageTitle>해외주식 내역</PageTitle>

      <TableContainer>
        <Table
          columns={[
            { field: 'id', label: '#', editable: false },
            { field: 'title', label: '종목명', editable: true },
            { field: 'ticker', label: '종목코드', editable: false },
            { field: 'currentPrice', label: '현재가', editable: false },
            { field: 'averagePrice', label: '매입단가', editable: true },
            { field: 'count', label: '보유수량', editable: true },
            { field: 'profit', label: '손익률', editable: false },
            { field: 'ratio', label: '비중', editable: false },
          ]}
          rows={usdStockState}
          showIndex={true}
          editable={true}
          summary={summary}
          onAdd={onAdd}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      </TableContainer>
    </Container>
  );
};
export default USDStockPresenter;
