import axios from 'axios';
import { API_URL } from '../url';
// import { useAppData } from '../../store/useAppData';

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
  // const { updateBan } = useAppData.getState();

  try {
    await axios.patch(`${API_URL}${variant}/${id}`, values);
  } catch (e) {
    console.log('ERROR', e);
  }
  console.log('This is API link', `${API_URL}${variant}/${id}`);
};
