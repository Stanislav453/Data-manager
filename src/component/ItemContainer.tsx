import { useState } from 'react';
import { useGetAction } from '../api/actions/useGetAction';
import { useAppData } from '../store/useAppData';
import { Item } from './Item';
import { CustomButton } from './CustomButton';
// import { CreateInputForm } from './form/CreateItemForm';
import { CreateUserForm } from './form/CreateUserForm';
import { CreateAnimalForm } from './form/CreateAnimalForm';
import { updateAction } from '../api/actions/updateAction';
import { FilterItemsForm } from './form/FilterItemsForm';
import { DEFAULT } from '../constants';

export const ItemContainer = () => {
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState('users');
  const appData = useAppData((state) => state.filterData);
  const updateBan = useAppData((state) => state.updateBan);
  const variantOption = variant === DEFAULT;

  useGetAction({ variant, setLoading});

  const handlleupdateItem = (id: string) => {
    const filterItem = appData.find((item) => item.id == id);
    const newBan = { banned: !filterItem?.banned };
    updateAction({ variant, id, values: newBan});
    updateBan(id);
  };

  const handleSwitchData = (variant: string) => {
    setLoading(true);
    setVariant(variant);
  };

  return (
    <main className='w-full min-h-dvh py-5 px-3'>
      <div className='flex flex-wrap justify-center  ls:justify-between gap-6 py-3'>
        <div className='flex gap-3 self-end p-3 bg-gray-200 rounded-full'>
          <CustomButton
            action={() =>  handleSwitchData('users')}
            customStyle={` ${
              variantOption ? 'bg-gray-500' : 'bg-gray-300'
            } self-end`}
          >
            Users
          </CustomButton>
          <CustomButton
            action={() =>  handleSwitchData('animals')}
            customStyle={` ${
              !variantOption ? 'bg-gray-500' : 'bg-gray-300'
            } self-end`}
          >
            Animals
          </CustomButton>
        </div>
        {variantOption ? (
          <CreateUserForm variant={variant} />
        ) : (
          <CreateAnimalForm variant={variant} />
        )}
        <FilterItemsForm />
      </div>
      <ul className='flex flex-col gap-3     '>
        <Item
          loading={loading}
          variant={variant}
          data={appData}
          action={(id) => handlleupdateItem(id)}
        />
      </ul>
    </main>
  );
};
