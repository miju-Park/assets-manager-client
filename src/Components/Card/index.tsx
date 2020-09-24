import React from 'react';
import styled from 'styled-components'

const CardContainer = styled.div`
  background-color: #343a40;
  width: 20%;
  height: 200px;
  border-radius: 0.5rem;
  padding: 20px;
  box-sizing: border-box;
`;
const Title = styled.p`
  margin:0;
  padding:0;
  color: #adb5bd;
`
const Text = styled.p`
  margin:0; 
  font-size: 2.5rem;
  color:white;
  text-align: center;
  font-weight: bold;
`

export type CardProps = {
  /** 카드 타이틀 */
  title: string;
  /** 타이틀 내용 */
  children: React.ReactNode;
}

const Card= ({title, children} : CardProps) => {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Text>{children}</Text>
    </CardContainer>
  )
}
export default Card;