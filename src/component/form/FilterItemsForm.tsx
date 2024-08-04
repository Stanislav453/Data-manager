import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton';
import { useAppData } from '../../store/useAppData';

const nameError = 'No numbers';
const required = 'required';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(required)
    .matches(/^[a-zA-Z\s]+$/, nameError),
});

export const FilterItemsForm = () => {
  const filterItems = useAppData((state) => state.filterItems);
  const data = useAppData((state) => state.data);

  console.log("This is data", data);
  

  const handleSubmit = (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    filterItems('');
    resetForm();
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleChange: any
  ) => {
    const { value } = e.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      handleChange(e);
      filterItems(value);
      console.log('Real-time:', value);
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
          className='flex self-end gap-3 p-3 bg-gray-200 rounded-full'
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
