import axios from 'axios';
import { API_URL } from '../url';
import { useAppData } from '../../store/useAppData';

type PostActionType<T> = {
  variant: string;
  id: string;
  values: T;
};

export const updateAction = async <T>({
  variant,
  id,
  values,
}: PostActionType<T>) => {
  const setError = useAppData.getState().setError;
 

  try {
    await axios.patch(`${API_URL}${variant}/${id}`, values);
  } catch (e) {
    setError(true)
    console.log('ERROR', e);
  }
  console.log('This is API link', `${API_URL}${variant}/${id}`);
};
