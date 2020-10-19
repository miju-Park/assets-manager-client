import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { useRecoilState } from 'recoil';
import { SavingProps } from '../../../types';
import { savingState } from '../../atoms';
import AccountPresenter from './Presenter';
import { GET_SAVING_LIST } from './query';

type GetAssetsQuery = {
  assets: {
    list: SavingProps[];
  };
};

const AccountContainer = () => {
  const [savingLists, setSavingLists] = useRecoilState<SavingProps[]>(
    savingState,
  );
  const { loading, error, data, refetch } = useQuery<GetAssetsQuery>(
    GET_SAVING_LIST,
  );
  useEffect(() => {
    if (data) {
      const {
        assets: { list },
      } = data;
      setSavingLists(
        list.map(item => {
          const {
            id,
            title,
            bank,
            payment,
            startdate,
            duedate,
            balance,
          } = item;
          return {
            id,
            bank,
            title,
            payment,
            startdate,
            duedate,
            balance,
            editMode: false,
          };
        }),
      );
    }
  }, [data]);
  const onAdd = () => {};
  const onRemove = () => {};
  const onUpdate = () => {};
  return (
    <AccountPresenter onAdd={onAdd} onRemove={onRemove} onUpdate={onUpdate} />
  );
};
export default AccountContainer;
