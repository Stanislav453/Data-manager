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

type ItemProps = {
  data: DataType[];
  variant: string;
  action: (id: string) => void;
};

const minAge = 1;
const ageError = 'Age cant be under 1';
const nameError = 'No numbers';
const required = 'required';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(required)
    .matches(/^[a-zA-Z\s]+$/, nameError),
  age: Yup.number().min(minAge, ageError).required(required),
});

export const Item = ({ data, variant, action }: ItemProps) => {
  const [editId, setEditId] = useState('');
  const updateData = useAppData((state) => state.deleteData);
  const editItem = useAppData((state) => state.editItem);

  const handleDeleteData = (id: string) => {
    updateData(id);
    deleteAction({ variant, id });
  };

  const handleEditItem = (id: string) => {
    setEditId((prevId) => (prevId === id ? '' : id));
  };

  const handleSubmit = (values: DataType) => {
    updateAction({ variant, id: editId, values: values });
    editItem(editId, values);
    setEditId('');
    console.log('this is values');
  };

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
        className={`flex w-full justify-between items-center p-4 list-none ${isBannedBorderColor} border-2`}
      >
        <div className='flex gap-2 w-full'>
          {isEdit ? (
            <Formik
              initialValues={
                variant === 'animals' ? { name, age, type } : { name, gender }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className='flex gap-2 w-full'>
                  <div className='flex flex-col'>
                    <Field
                      className='drop-shadow-md p-1.5 rounded-lg'
                      type='text'
                      name='name'
                    />
                    <ErrorMessage
                      name='name'
                      component='p'
                      className='text-red-500'
                    />
                  </div>
                  {gender && (
                    <Field
                      as='select'
                      className='flex-none w-26 p-2 rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      name='gender'
                    >
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </Field>
                  )}
                  {age && (
                    <div>
                      <Field
                        className='drop-shadow-md p-1.5 rounded-lg'
                        type='number'
                        name='age'
                      />
                      <ErrorMessage
                        name='age'
                        component='p'
                        className='text-red-500'
                      />
                    </div>
                  )}
                  {type && (
                    <Field
                      as='select'
                      className='flex-none w-26 p-2 rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      name='type'
                    >
                      <option value='dog'>Dog</option>
                      <option value='cat'>Cat</option>
                      <option value='other'>Other</option>
                    </Field>
                  )}
                  <CustomButton customStyle='bg-orange-500'>
                    Change item
                  </CustomButton>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <h2>
                <span className='font-bold'>Name: </span>
                {name}
              </h2>
              {gender && (
                <p>
                  <span className='font-bold'>Gender: </span>
                  {gender}
                </p>
              )}
              {age && (
                <p>
                  <span className='font-bold'>Age: </span>
                  {age}
                </p>
              )}
              {type && (
                <p>
                  <span className='font-bold'>Type: </span>
                  {type}
                </p>
              )}
            </>
          )}
        </div>
        <div className='flex'>
          <CustomButton action={() => handleEditItem(id)}>
            {editIconVariant}
          </CustomButton>
          <CustomButton action={() => handleDeleteData(id)}>
            <FaRegTrashCan className='text-3xl text-red-500' />
          </CustomButton>
          {gender && (
            <CustomButton customStyle={isBannedColor} action={() => action(id)}>
              {isBanned}
            </CustomButton>
          )}
        </div>
      </li>
    );
  });
};
