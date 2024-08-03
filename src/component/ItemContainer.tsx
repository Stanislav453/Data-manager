import React from "react";
import { useState } from "react";
import { useGetAction } from "../api/actions/useGetAction";
import { useAppData } from "../store/useAppData";
import { Item } from "./Item";
import { CustomButton } from "./CustomButton";
// import { CreateInputForm } from './form/CreateItemForm';
import { CreateUserForm } from './form/CreateUserForm';
import { CreateAnimalForm } from './form/CreateAnimalForm';

export const ItemContainer = () => {
  const [variant, setVariant] = useState("users");
  const appData = useAppData((state) => state.filterData);

  useGetAction(variant);
  console.log(appData);

  return (
    <main className='w-full min-h-dvh py-5 px-3'>
      <div className='flex gap-3 py-3'>
        <CustomButton
          action={() => setVariant('users')}
          customStyle='bg-gray-500 self-end'
        >
          Users
        </CustomButton>
        <CustomButton
          action={() => setVariant('animals')}
          customStyle='bg-gray-500 self-end'
        >
          Animals
        </CustomButton>
        {variant === 'users' ? <CreateUserForm /> : <CreateAnimalForm variant={variant} />}

      </div>
      <ul className='flex flex-col gap-3     '>
        <Item variant={variant} data={appData} />
      </ul>
    </main>
  );
};
