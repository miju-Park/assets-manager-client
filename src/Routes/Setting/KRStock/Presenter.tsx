import React, { useEffect } from 'react';
import styled from 'styled-components';
import Table from '../../../Components/Table';
import { Save } from '@styled-icons/heroicons-outline/Save';
import { useRecoilState } from 'recoil';
import { krStockState } from '../../atoms';

const TableContainer = styled.div`
  margin-top: 30px;
  position: relative;
`;
const IconStyle = styled.span`
  color: white;
  display: inline-block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  &:hover {
    color: #e14eca;
  }
  cursor: pointer;
`;

const UpdateButtonGroup = styled.div`
  position: absolute;
  right: 0;
  top: -10px;
`;
const Container = styled.div`
  padding: 78px 30px 30px 280px;
  min-height: calc(100vh - 70px);
`;

const PageTitle = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
`;

export type StockProps = {
  id: string;
  title: string;
  ticker: string;
  currentPrice: number;
  averagePrice: number;
  count: number;
  ratio: string;
  profit: string;
  editMode: boolean;
};

type KRStockProps = {
  onRemove: (id: string) => void;
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: string,
    value: string | number | boolean,
  ) => void;
  onSave: () => void;
};

const KRStockPresenter = ({
  onAdd,
  onRemove,
  onUpdate,
  onSave,
}: KRStockProps) => {
  const [list, setList] = useRecoilState(krStockState);
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
        <UpdateButtonGroup>
          <IconStyle>
            <Save onClick={onSave} />
          </IconStyle>
        </UpdateButtonGroup>
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
          rows={krStockState}
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
