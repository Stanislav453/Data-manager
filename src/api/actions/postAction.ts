import axios from 'axios';
import { API_URL } from '../url';
import { useAppData } from '../../store/useAppData';

type PostActionType<T> = {
  variant: string;
  values: T;
};

export const postAction = async <T>({ variant, values }: PostActionType<T>) => {
  const updateData = useAppData.getState().updateData;

  try {
    const response = await axios.post(`${API_URL}${variant}`, values);
    updateData(response.data);
  } catch (e) {
    console.log('ERROR', e);
  }
};
