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

export const ItemContainer = () => {
  const [variant, setVariant] = useState('users');
  const appData = useAppData((state) => state.filterData);
  const updateBan = useAppData((state) => state.updateBan);
  // const buttonVariantColor =
  //   variant === 'users' ? 'bg-gray-500' : 'bg-gray-5100';

  useGetAction(variant);
  console.log(appData);

  const handlleupdateItem = (id: string) => {
    const filterItem = appData.find((item) => item.id == id);
    const newBan = { banned: !filterItem?.banned };
    updateAction({ variant, id, values: newBan });
    updateBan(id);
  };

  return (
    <main className='w-full min-h-dvh py-5 px-3'>
      <div className='flex flex-wrap justify-center  ls:justify-between gap-6 py-3'>
        <div className='flex gap-3 self-end p-3 bg-gray-200 rounded-full'>
          <CustomButton
            action={() => setVariant('users')}
            customStyle={`bg-gray-500 self-end`}
          >
            Users
          </CustomButton>
          <CustomButton
            action={() => setVariant('animals')}
            customStyle='bg-gray-500 self-end'
          >
            Animals
          </CustomButton>
        </div>
        {variant === 'users' ? (
          <CreateUserForm variant={variant} />
        ) : (
          <CreateAnimalForm variant={variant} />
        )}
        <FilterItemsForm />
      </div>
      <ul className='flex flex-col gap-3     '>
        <Item
          variant={variant}
          data={appData}
          action={(id) => handlleupdateItem(id)}
        />
      </ul>
    </main>
  );
};
