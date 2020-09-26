import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #343a40;
  width: 100%;
  height: 200px;
  border-radius: 0.5rem;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
  flex-direction: column;
`;
const Title = styled.p`
  margin: 0;
  padding: 0;
  color: #adb5bd;
`;
const Text = styled.p`
  margin: 0;
  font-size: 2.5rem;
  color: white;
  text-align: center;
  font-weight: bold;
`;

export type CardProps = {
  /** 타이틀 내용 */
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <CardContainer>{children}</CardContainer>;
};
export default Card;
