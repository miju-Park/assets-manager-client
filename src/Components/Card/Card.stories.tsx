import React from 'react';
import Card from '../Card';

export default {
  title: 'Components/Card',
  component: Card
}

export const simpleCard = () => {
  return <Card title="총 자산"><p>1320만원</p></Card>
};
