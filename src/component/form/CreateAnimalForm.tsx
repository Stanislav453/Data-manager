import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton';
import { postAction } from '../../api/actions/postAction';
import {
  required,
  onlyLetters,
  minAge,
  ageError,
  minLetterName,
  minLetterNameError,
} from '../../constants';

type FormType = {
  name: string;
  type: string;
  age: number;
};

type CreateAnimalFormType = {
  variant: string;
};

export const CreateAnimalForm = ({ variant }: CreateAnimalFormType) => {
  const formik = useFormik<FormType>({
    initialValues: {
      name: '',
      type: 'dog',
      age: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(minLetterName, minLetterNameError)
        .matches(/^[A-Za-z\s]+$/, onlyLetters)
        .required(required),
      type: Yup.string(),
      age: Yup.number().min(minAge, ageError).required(required),
    }),

    onSubmit: async (values: FormType, { resetForm }) => {
      const trimmedValues = {
        name: values.name.trim(),
        age: values.age,
        type: values.type,
      };

      if (trimmedValues.name || trimmedValues.age || trimmedValues.type) {
        postAction({ variant, values: trimmedValues });
        resetForm();
      } else {
        console.log('error');
        return;
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-wrap justify-center self-end gap-3 item-center p-3 bg-gray-200 rounded-full'
    >
      <div className='flex flex-col self-end'>
        <label
          className={`${
            formik.touched.name && formik.errors.name
              ? 'text-red-500'
              : 'text-black'
          }`}
          htmlFor='name'
        >
          {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
        </label>
        <input
          className='drop-shadow-md p-1.5 rounded-full'
          type='text'
          name='name'
          placeholder='Name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div className='flex flex-col self-end text-center'>
        <label
          className={`${
            formik.touched.age && formik.errors.age
              ? 'text-red-500'
              : 'text-black'
          }`}
          htmlFor='age'
        >
          {formik.touched.age && formik.errors.age ? formik.errors.age : 'Age'}
        </label>
        <input
          className='max-w-14 drop-shadow-md p-1.5 rounded-full'
          name='age'
          type='number'
          onChange={formik.handleChange}
          value={formik.values.age}
          placeholder='Age'
        />
      </div>
      <div className='flex flex-col self-end'>
        <label
          className={`${
            formik.touched.type && formik.errors.type
              ? 'text-red-500'
              : 'text-black'
          }`}
          htmlFor='type'
        >
          {formik.touched.type && formik.errors.type
            ? formik.errors.type
            : 'type'}
        </label>
        <select
          name='type'
          onChange={formik.handleChange}
          value={formik.values.type}
          className='flex-none w-26 p-2 rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option value='dog'>Dog</option>
          <option value='cat'>Cat</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <CustomButton
        customStyle=' font-semibold bg-blue-500 self-end'
        type='button'
        action={formik.submitForm}
      >
        Add animal
      </CustomButton>
    </form>
  );
};
