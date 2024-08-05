import axios from 'axios';
import { API_URL } from '../url';
import { useAppData } from '../../store/useAppData';

type PostActionType<T> = {
  variant: string;
  values: T;
};

export const postAction = async <T>({ variant, values }: PostActionType<T>) => {
  const updatePostData = useAppData.getState().updatePostData;
  const setError = useAppData.getState().setError;

  try {
    const response = await axios.post(`${API_URL}${variant}`, values);
    updatePostData(response.data);
  } catch (e) {
    setError(true);
    console.log('ERROR', e);
  }
};
