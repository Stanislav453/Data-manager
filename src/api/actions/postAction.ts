import axios from 'axios';
import { API_URL } from '../url';
import { DataType } from '../../type';
import { useAppData } from '../../store/useAppData';

type postActionType = {
  variant: string;
  values: DataType;
};

export const postAction = async ({ variant, values }: postActionType) => {
  const updateData = useAppData.getState().updateData;

  try {
    const response = await axios.post(`${API_URL}${variant}`, values);
    console.log('this is response from POST', response.data);
    updateData(response.data);
  } catch (e) {
    console.log('ERROR', e);
  }
  console.log('This is API link', `${API_URL}${variant}`);
};
