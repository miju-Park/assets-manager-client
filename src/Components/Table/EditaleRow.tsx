import React, { useState } from 'react';
import styled from 'styled-components';

type EditableRowProps = {
  id: string;
  param: string;
  value: string;
  editMode: boolean;
  onUpdate: (id: string, field: string, value: string) => void;
};
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
const EditableRow = ({
  id,
  param,
  value,
  editMode,
  onUpdate,
}: EditableRowProps) => {
  const [input, setInput] = useState(value);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target) {
      const { name, value } = e.target as HTMLInputElement;
      setInput(value);
    }
  };
  return (
    <TableInputContent
      key={['row', param].join('_')}
      name={param}
      value={input}
      disabled={editMode}
      onChange={onChangeInput}
      onBlur={() => onUpdate(id, param, input)}
    />
  );
};
export default EditableRow;
