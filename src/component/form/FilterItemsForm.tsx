import { Field, Form, Formik, FormikHandlers } from 'formik';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton';
import { useAppData } from '../../store/useAppData';
import { required, onlyLetters } from '../../constants';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(required)
    .matches(/^[a-zA-Z\s]+$/, onlyLetters),
});

export const FilterItemsForm = () => {
  const filterItems = useAppData((state) => state.filterItems);

  const handleSubmit = (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    filterItems('');
    resetForm();
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleChange: FormikHandlers['handleChange']
  ) => {
    const { value } = e.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      handleChange(e);
      filterItems(value);
    }
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
    >
      {({ errors, touched, handleSubmit, handleChange, values }) => (
        <Form
          onSubmit={handleSubmit}
          className='flex flex-wrap justify-center self-end gap-3 p-3 bg-gray-200 rounded-full'
        >
          <div className='flex flex-col'>
            {errors.name && touched.name ? (
              <span className='text-red-500 text-center'>{errors.name}</span>
            ) : (
              ''
            )}
            <Field
              className='drop-shadow-md p-1.5 rounded-full'
              type='text'
              name='name'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e, handleChange)
              }
              value={values.name}
              placeHolder='Filter name'
            />
          </div>

          <CustomButton type='submit' customStyle='bg-orange-500 self-end'>
            Clear filter
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};
