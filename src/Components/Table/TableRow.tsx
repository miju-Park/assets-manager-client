import React from 'react';
import styled from 'styled-components';
import { TableColumnInfo } from '../../types';
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt';
import { Revision } from '@styled-icons/boxicons-regular/Revision';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';

type TableRowProps = {
  columns: TableColumnInfo[];
  rows: { [key: string]: string | number }[];
  showIndex: boolean;
  editable: boolean;
  onRemove: (id: number) => void;
  onUpdate: (
    id: number,
    field: string,
    value: string | number | boolean,
  ) => void;
};

const TableContent = styled.span`
  display: flex;
  align-items: center;
`;
const TableInputContent = styled.input`
  width: 100%;
  display: inline-block;
  font-size: 1rem;
  border: none;
  padding: 0;
  padding-left: 5px;
  margin: 5px 0;
  background-color: ${props => (props.disabled ? 'transparent' : 'white')};
  &:focus {
    outline: none;
  }
  color: ${props => (props.disabled ? '#ced4da' : 'black')};
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

const TableRow = ({
  columns,
  rows,
  showIndex,
  editable,
  onRemove,
  onUpdate,
}: TableRowProps) => {
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
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const { name, value } = e.target as HTMLInputElement;
      const [field, id] = name.split('-');
      onUpdate(parseInt(id), field, value);
    }
  };
  return (
    <>
      {rows.map((row, key) => {
        return (
          <TableContentContainer>
            {showIndex && <TableContent>{key + 1}</TableContent>}
            {Object.keys(row).map((rowKey, index) => {
              if (rowKey === 'editMode') {
                return (
                  <TableContent>
                    <IconStyle>
                      {row[rowKey] ? (
                        <Revision
                          onClick={() =>
                            onUpdate(row.id as number, rowKey, false)
                          }
                        />
                      ) : (
                        <EditAlt
                          onClick={() =>
                            onUpdate(row.id as number, rowKey, true)
                          }
                        />
                      )}
                    </IconStyle>
                    <IconStyle>
                      <DeleteOutline
                        onClick={() => onRemove(row.id as number)}
                      />
                    </IconStyle>
                  </TableContent>
                );
              } else if (rowKey === 'id') {
                return null;
              }
              if (columns[index]?.editable) {
                return (
                  <TableInputContent
                    name={`${rowKey}-${row.id}`}
                    value={row[rowKey]}
                    disabled={!row?.editMode}
                    onChange={onChangeInput}
                  />
                );
              } else {
                return <TableContent>{row[rowKey]}</TableContent>;
              }
            })}
          </TableContentContainer>
        );
      })}
    </>
  );
};
export default TableRow;
