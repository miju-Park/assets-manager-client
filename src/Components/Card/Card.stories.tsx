import React from 'react';
import Card from '../Card';

export default {
  title: 'Components/Card',
  component: Card
}

export const simpleCard = () => {
  return <Card title="총 자산">1320만원</Card>
};

export const exchangesCard = () => {
  return <Card title="기준환율">1670.4원</Card>
}
