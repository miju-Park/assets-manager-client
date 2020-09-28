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
type StockProps = {
  id: number;
  title: string;
  ticker: string;
  currentPrice: number;
  averagePrice: number;
  count: number;
  ratio: string;
  profit: string;
};

type KRStockProps = {
  list: StockProps[];
  onRemove: (id: number) => void;
  onAdd: () => void;
  onUpdate: (
    id: number,
    field: string,
    value: string | number | boolean,
  ) => void;
};

const KRStockPresenter = ({
  list,
  onAdd,
  onRemove,
  onUpdate,
}: KRStockProps) => {
  const summary = {
    current: list.reduce(
      (sum, item) => sum + item.count * item.currentPrice,
      0,
    ),
    average: list.reduce(
      (sum, item) => sum + item.count * item.averagePrice,
      0,
    ),
  };
  return (
    <Container>
      <PageTitle>국내주식 내역</PageTitle>
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
          rows={list}
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
export default KRStockPresenter;
