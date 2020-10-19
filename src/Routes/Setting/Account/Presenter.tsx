import React from 'react';
import styled from 'styled-components';
import Table from '../../../Components/Table';
import { StockTableProps } from '../../../types';
import { checkingState, cmaState, savingState } from '../../atoms';

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
  position: relative;
`;

export default function ({ onAdd, onRemove, onUpdate }: StockTableProps) {
  return (
    <Container>
      <PageTitle>예/적금 & CMA</PageTitle>

      <TableContainer>
        <Table
          columns={[
            { field: 'id', label: '#', editable: false },
            { field: 'bank', label: '은행명', editable: true },
            { field: 'title', label: '계좌명', editable: true },
            { field: 'payment', label: '납부액', editable: true },
            { field: 'startdate', label: '시작일', editable: true },
            { field: 'duedate', label: '만기일', editable: true },
            { field: 'balance', label: '총액', editable: false },
          ]}
          rows={savingState}
          showIndex={true}
          editable={true}
          onAdd={onAdd}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      </TableContainer>
      <TableContainer>
        <Table
          columns={[
            { field: 'id', label: '#', editable: false },
            { field: 'bank', label: '은행명', editable: true },
            { field: 'title', label: '계좌명', editable: true },
            { field: 'payment', label: '예치금', editable: true },
            { field: 'startdate', label: '시작일', editable: true },
            { field: 'duedate', label: '만기일', editable: true },
          ]}
          rows={checkingState}
          showIndex={true}
          editable={true}
          onAdd={onAdd}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      </TableContainer>
      <TableContainer>
        <Table
          columns={[
            { field: 'id', label: '#', editable: false },
            { field: 'bank', label: '은행명', editable: true },
            { field: 'title', label: '계좌명', editable: true },
            { field: 'payment', label: '예치금', editable: true },
          ]}
          rows={cmaState}
          showIndex={true}
          editable={true}
          onAdd={onAdd}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      </TableContainer>
    </Container>
  );
}
