import React from 'react';
import { CustomButton } from '../CustomButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const CreateAnimalForm = () => {
  const minLetterName = 4;
  const minLetterNameError = ` min ${minLetterName} characters`;
  const onlyLetterError = 'Only letters';
  const minAge = 1;
  const ageError = 'Age cant be under 1';
  const required = 'Is required';

  type FormType = {
    name: string;
    type: string;
    age: number;
  };

  const formik = useFormik<FormType>({
    initialValues: {
      name: '',
      type: '',
      age: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(minLetterName, minLetterNameError)
        .matches(/^[A-Za-z]+$/, onlyLetterError)
        .required(required),
      type: Yup.string(),
      age: Yup.number().min(minAge, ageError),
    }),
    validate: (values) => {
      const errors: Partial<FormType> = {};
      if (values.age < minAge) {
        values.age = minAge;
      }
      return errors;
    },
    onSubmit: async (values: FormType, { resetForm }) => {
      if (!values.name || !values.age || !values.type) {
        //Create validation error
        console.log('error');
        
        return;
    }
    
    console.log('This is update Value', values.name, values.age, values.type);

      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex gap-3 item-center'>
      <div className='flex flex-col'>
        <label
          className={`${
            formik.touched.name && formik.errors.name
              ? 'text-red-500'
              : 'text-black'
          }`}
          htmlFor='name'
        >
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : 'Name'}
        </label>
        <input
          className='drop-shadow-md'
          type='text'
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='age'>Age</label>
        <input
          className='drop-shadow-md'
          name='age'
          type='number'
          onChange={formik.handleChange}
          value={formik.values.age}
        />
      </div>
      <div className='self-end'>
        <select
          name='type'
          onChange={formik.handleChange}
          value={formik.values.type}
          className='flex-none w-26 p-2 ml-[21px] rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option value='dog'>Dog</option>
          <option value='cat'>Cat</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <button
        onClick={formik.submitForm}
        type='button'
        className=' font-semibold bg-blue-500'
      >
        Cereate item
      </button>
      {/* <CustomButton
        customStyle=' font-semibold bg-blue-500'
        action={formik.submitForm}
      >
        Add animal
      </CustomButton> */}
    </form>
  );
};
