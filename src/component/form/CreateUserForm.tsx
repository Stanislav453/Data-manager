import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton';
import { postAction } from '../../api/actions/postAction';
import {
  required,
  onlyLetters,
  minLetterName,
  minLetterNameError,
} from '../../constants';

type CreateUserFormType = {
  variant: string;
};

type FormType = {
  name: string;
  gender: string;
  banned: false;
};
export const CreateUserForm = ({ variant }: CreateUserFormType) => {
  const formik = useFormik<FormType>({
    initialValues: {
      name: '',
      gender: 'male',
      banned: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(minLetterName, minLetterNameError)
        .matches(/^[A-Za-z\s]+$/, onlyLetters)
        .required(required),
      gender: Yup.string(),
    }),
    validateOnChange: true,
    onSubmit: async (values: FormType, { resetForm }) => {
      const trimmedValues = {
        name: values.name.trim(),
        gender: values.gender,
        banned: values.banned
      };

      if (trimmedValues.name || trimmedValues.gender) {
        postAction({ variant, values: trimmedValues });
        console.log(trimmedValues);
        
      } else {
        console.log('error');
        return;
      }
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-wrap justify-center self-end gap-3 item-center p-3 bg-gray-200 rounded-full'
    >
      <div className='flex flex-col justify-end'>
        <label
          className={`${
            formik.touched.name && formik.errors.name
              ? 'text-red-500'
              : 'text-black'
          } text-center`}
          htmlFor='name'
        >
          {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
        </label>
        <input
          className='drop-shadow-md p-1.5 rounded-full'
          type='text'
          name='name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder='Name'
        />
      </div>
      <div className='self-end'>
        <select
          className='flex-none w-26 p-2 rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          name='gender'
          onChange={formik.handleChange}
          value={formik.values.gender}
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <CustomButton
        customStyle='self-end font-semibold bg-blue-500'
        type='button'
        action={formik.submitForm}
      >
        Cereate user
      </CustomButton>
    </form>
  );
};
