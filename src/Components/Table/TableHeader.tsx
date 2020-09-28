import { TableColumnInfo } from '../../types';
import React from 'react';
import styled from 'styled-components';

type TableHederProps = {
  columns: TableColumnInfo[];
  showIndex: boolean;
  editable: boolean;
};
const Header = styled.label`
  font-weight: 800;
  display: flex;
  align-items: center;
`;

const TableHeader = ({ columns, showIndex, editable }: TableHederProps) => {
  const TableHeaderContainer = styled.div`
    display: grid;
    grid-template-columns: ${showIndex ? '70px' : ''} repeat(
        ${columns.length - (showIndex ? 1 : 0) + (editable ? 1 : 0)},
        1fr
      );
    column-gap: 1rem;
    border-bottom: 1px solid #fff;
  `;
  return (
    <TableHeaderContainer>
      {columns[0] && <Header>{columns[0].label}</Header>}
      {columns[1] && <Header>{columns[1].label}</Header>}
      {columns[2] && <Header>{columns[2].label}</Header>}
      {columns[3] && <Header>{columns[3].label}</Header>}
      {columns[4] && <Header>{columns[4].label}</Header>}
      {columns[5] && <Header>{columns[5].label}</Header>}
      {columns[6] && <Header>{columns[6].label}</Header>}
      {columns[7] && <Header>{columns[7].label}</Header>}
      {columns[8] && <Header>{columns[8].label}</Header>}
      {editable && <Header></Header>}
    </TableHeaderContainer>
  );
};
export default TableHeader;
