import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton';
import { postAction } from '../../api/actions/postAction';

type CreateAnimalFormType = {
  variant: string;
};

export const CreateAnimalForm = ({ variant }: CreateAnimalFormType) => {
  // const updateData = useAppData((state) => state.updateData);

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
      type: 'dog',
      age: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(minLetterName, minLetterNameError)
        .matches(/^[A-Za-z]+$/, onlyLetterError)
        .required(required),
      type: Yup.string(),
      age: Yup.number().min(minAge, ageError).required(required),
    }),

    onSubmit: async (values: FormType, { resetForm }) => {
      if (values.name || values.age || values.type) {
        // updateData(values);
        postAction({ variant, values });
        resetForm();
      } else {
        //Create validation error
        console.log('error');
        return;
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex gap-3 item-center'>
      <div className='flex flex-col self-end'>
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
          className='drop-shadow-md p-1.5 rounded-lg'
          type='text'
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div className='flex flex-col self-end'>
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
          className='drop-shadow-md p-1.5 rounded-lg'
          name='age'
          type='number'
          onChange={formik.handleChange}
          value={formik.values.age}
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
        action={formik.submitForm}
      >
        Add animal
      </CustomButton>
    </form>
  );
};
