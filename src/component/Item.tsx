import { useAppData } from '../store/useAppData';
import { CustomButton } from './CustomButton';
import { FaRegTrashCan, FaPencil } from 'react-icons/fa6';
import { DataType } from '../type';
import { deleteAction } from '../api/actions/deleteAction';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import * as Yup from 'yup';
import { updateAction } from '../api/actions/updateAction';
import { required, onlyLetters, DEFAULT } from '../constants';
import { ItemsFormType } from '../type';
import { minAge, ageError } from '../constants';

type ItemProps = {
  data: DataType[];
  variant: string;
  loading: boolean;
  action: (id: string) => void;
};

export const Item = ({ data, variant, loading, action }: ItemProps) => {
  const [editId, setEditId] = useState('');
  const updateData = useAppData((state) => state.deleteData);
  const editItem = useAppData((state) => state.editItem);
  const error = useAppData((state) => state.error);

  const validationSchema = Yup.object().shape(
    variant === DEFAULT
      ? {
          name: Yup.string()
            .required(required)
            .matches(/^[a-zA-Z\s]+$/, onlyLetters),
        }
      : {
          name: Yup.string()
            .required(required)
            .matches(/^[a-zA-Z\s]+$/, onlyLetters),
          age: Yup.number().min(minAge, ageError).required(required),
        }
  );

  const handleDeleteData = (id: string) => {
    updateData(id);
    deleteAction({ variant, id });
  };

  const handleEditItem = (id: string) => {
    setEditId((prevId) => (prevId === id ? '' : id));
  };

  const handleSubmit = (values: DataType) => {
    updateAction({
      variant,
      id: editId,
      values: values,
    });
    editItem(editId, values);
    setEditId('');
  };

  if (error) {
    return (
      <p className='w-full text-center font-bold text-3xl text-red-500'>
        Something is wrong. Please try it later.
      </p>
    );
  }

  if (loading) {
    return <p className='w-full text-center font-bold text-3xl'>Loading...</p>;
  }
  return data.map((oneResult, index) => {
    const { id, name, gender, banned, age, type } = oneResult;

    const isBanned = banned ? 'Unbaned' : 'banned';
    const isBannedColor = banned ? 'bg-green-500' : 'bg-red-500';
    const isBannedBorderColor = banned ? 'border-red-500' : 'border-slate-500';

    const isEdit = id === editId;

    const editIconVariant = isEdit ? (
      <IoCloseCircle className='text-3xl text-orange-500' />
    ) : (
      <FaPencil className='text-3xl text-orange-500' />
    );

    return (
      <li
        key={index}
        className={`flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-5 w-full p-4 list-none ${isBannedBorderColor} border-2`}
      >
        <div className='flex gap-2 w-full justify-center sm:justify-start'>
          {isEdit ? (
            <Formik<ItemsFormType>
              initialValues={
                variant === DEFAULT ? { name, gender } : { name, age, type }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form
                  onSubmit={handleSubmit}
                  className='flex flex-wrap justify-center sm:justify-start gap-2 w-full'
                >
                  <div className='flex flex-col justify-end'>
                    <ErrorMessage
                      name='name'
                      component='p'
                      className='text-red-500'
                    />
                    <Field
                      className=' drop-shadow-md p-1.5 rounded-lg'
                      type='text'
                      name='name'
                    />
                  </div>
                  {gender && (
                    <Field
                      as='select'
                      className='flex-none self-end w-26 p-2 rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      name='gender'
                    >
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </Field>
                  )}
                  {age && (
                    <div>
                      <ErrorMessage
                        name='age'
                        component='p'
                        className='text-red-500'
                      />
                      <Field
                        className='max-w-16 self-end drop-shadow-md p-1.5 rounded-lg'
                        type='number'
                        name='age'
                      />
                    </div>
                  )}
                  {type && (
                    <Field
                      as='select'
                      className='self-end flex-none w-26 p-2 rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      name='type'
                    >
                      <option value='dog'>Dog</option>
                      <option value='cat'>Cat</option>
                      <option value='other'>Other</option>
                    </Field>
                  )}
                  <CustomButton
                    type='submit'
                    customStyle=' self-end bg-orange-500'
                  >
                    Change item
                  </CustomButton>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <div className='flex gap-2'>
                <span className='font-bold'>Name: </span>
                <h2 className='capitalize'>{name}</h2>
              </div>
              {gender && (
                <div className='flex gap-2'>
                  <span className='font-bold'>Gender: </span>
                  <h2 className='capitalize'>{gender}</h2>
                </div>
              )}
              {age && (
                <div className='flex gap-2'>
                  <span className='font-bold'>Age: </span>
                  <h2 className='capitalize'>{age}</h2>
                </div>
              )}
              {type && (
                <div className='flex gap-2'>
                  <span className='font-bold'>Type: </span>
                  <h2 className='capitalize'>{type}</h2>
                </div>
              )}
            </>
          )}
        </div>
        <div className='flex gap-6'>
          <CustomButton
            customStyle='!p-0'
            action={() => {
              id && handleEditItem(id);
            }}
          >
            {editIconVariant}
          </CustomButton>
          <CustomButton
            customStyle='!p-0'
            action={() => {
              id && handleDeleteData(id);
            }}
          >
            <FaRegTrashCan className='text-3xl text-red-500' />
          </CustomButton>
          {gender && (
            <CustomButton
              customStyle={isBannedColor}
              action={() => {
                id && action(id);
              }}
            >
              {isBanned}
            </CustomButton>
          )}
        </div>
      </li>
    );
  });
};
