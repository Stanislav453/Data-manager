import { useFormik } from 'formik';
import * as Yup from "yup"
import { CustomButton } from '../CustomButton';

export const CreateUserForm = () => {
  return (
    <form className='flex gap-3 item-ceter'>
      <div className='flex flex-col'>
        <label htmlFor='name'>Name</label>
        <input className='drop-shadow-md' type='text' name='name' />
      </div>
      <div className='self-end'>
        <select
          id='task-tag'
          name='tag'
          // onChange={handleChange}
          // value={updateTask.tag}
          className='flex-none w-26 p-2 ml-[21px] rounded-lg bg-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <CustomButton customStyle=' font-semibold bg-blue-500'>
        Cereate item
      </CustomButton>
    </form>
  );
};
