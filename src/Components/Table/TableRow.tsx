import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt';
import { Revision } from '@styled-icons/boxicons-regular/Revision';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';

import { TableColumnInfo } from '../../types';
import EditableRow from './EditaleRow';

type RowProps = {
  index: number;
  columns: TableColumnInfo[];
  row: { [key: string]: string | number | boolean };
  showIndex: boolean;
  editable: boolean;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    field: string,
    value: string | number | boolean,
  ) => void;
};
const TableContent = styled.span`
  display: flex;
  align-items: center;
`;

const IconStyle = styled.span`
  color: white;
  width: 25px;
  height: 25px;
  line-height: 25px;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

const dateRegEx = /\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}/g;
const parsingRowContent = (content: string | number | boolean) => {
  if (typeof content === 'string' && dateRegEx.test(content)) {
    return content.split('T')[0] || '';
  }
  return content;
};

const TableRow = ({
  index,
  columns,
  row,
  showIndex,
  editable,
  onUpdate,
  onRemove,
}: RowProps) => {
  const TableContentContainer = styled.div`
    display: grid;
    grid-template-columns: ${showIndex ? '70px' : ''} repeat(
        ${columns.length - (showIndex ? 1 : 0) + (editable ? 1 : 0)},
        1fr
      );
    column-gap: 1rem;
    border-bottom: 1px solid #fff;
    &:hover {
      background-color: #e14eca;
    }
  `;

  return (
    <TableContentContainer key={index}>
      {showIndex && <TableContent key={'row_key'}>{index + 1}</TableContent>}
      {Object.keys(row).map((param, paramIndex) => {
        if (param === 'editMode') {
          return (
            <TableContent>
              <IconStyle>
                {row[param] ? (
                  <Revision
                    onClick={() => onUpdate(row.id + '', param, false)}
                  />
                ) : (
                  <EditAlt onClick={() => onUpdate(row.id + '', param, true)} />
                )}
              </IconStyle>
              <IconStyle>
                <DeleteOutline onClick={() => onRemove(row.id + '')} />
              </IconStyle>
            </TableContent>
          );
        } else if (param === 'id') {
          return null;
        }
        if (columns[paramIndex]?.editable && row[param] !== undefined) {
          return (
            <EditableRow
              id={row.id as string}
              key={['row', param, index].join('_')}
              param={param}
              value={parsingRowContent(row[param]) as string}
              editMode={!row?.editMode}
              onUpdate={onUpdate}
            />
          );
        } else {
          return (
            <TableContent key={['row', param].join('_')}>
              {parsingRowContent(row[param])}
            </TableContent>
          );
        }
      })}
    </TableContentContainer>
  );
};
export default TableRow;
