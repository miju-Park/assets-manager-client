import { CURRENCY, TableColumnInfo } from '../../types';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { getAbstractNumber, getPercentage } from '../../utils';
import { AddCircle } from '@styled-icons/ionicons-outline/AddCircle';

export type TableProps = {
  columns: TableColumnInfo[];
  rows: { [key: string]: string | number }[];
  showIndex: boolean;
  editable: boolean;
  summary: {
    current: number;
    average: number;
  };
  onRemove: (id: number) => void;
  onAdd: () => void;
  onUpdate: (
    id: number,
    field: string,
    value: string | number | boolean,
  ) => void;
};

const Title = styled.h3`
  margin: 20px 0;
  font-size: 1rem;
  font-weight: bold;
`;

const TableContainer = styled.div`
  padding-left: 10px;
  background-color: #27293d;
  display: grid;
  grid-auto-rows: 40px;
  align-items: stretch;
  justify-items: stretch;
`;
const TableAddColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const IconStyle = styled.span`
  color: white;
  color: white;
  width: 35px;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  &:hover {
    color: #e14eca;
  }
  cursor: pointer;
`;

const SummaryTitle = styled.span`
  grid-column: 1/5;
  justify-content: center;
  display: flex;
  align-items: center;
`;
const Summary = styled.span`
  display: flex;
  align-items: center;
`;

const Table = ({
  columns,
  rows,
  showIndex,
  editable,
  summary,
  onAdd,
  onRemove,
  onUpdate,
}: TableProps) => {
  const SummaryContainer = styled.div`
    background-color: #27293d;
    display: grid;
    grid-auto-rows: 40px;
    grid-template-columns: ${showIndex ? '70px' : ''} repeat(
        ${columns.length - (showIndex ? 1 : 0) + (editable ? 1 : 0)},
        1fr
      );
    column-gap: 1rem;
  `;
  return (
    <>
      <Title>내역</Title>
      <TableContainer>
        <TableHeader
          columns={columns}
          showIndex={showIndex}
          editable={editable}
        />
        <TableRow
          columns={columns}
          rows={rows}
          showIndex={showIndex}
          editable={editable}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
        <TableAddColumn>
          <IconStyle>
            <AddCircle onClick={onAdd} />
          </IconStyle>
        </TableAddColumn>
      </TableContainer>
      <Title>총합</Title>
      <SummaryContainer>
        <SummaryTitle>총합</SummaryTitle>
        <Summary>{getAbstractNumber(summary.current, CURRENCY.KRW)}</Summary>
        <Summary>
          {getPercentage(summary.current - summary.average, summary.average)}
        </Summary>
      </SummaryContainer>
    </>
  );
};

export default Table;
