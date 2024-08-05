import axios from 'axios';
import { API_URL } from '../url';
import { useAppData } from '../../store/useAppData';

type deleteActionType = {
  variant: string;
  id: string;
};

export const deleteAction = async ({ variant, id }: deleteActionType) => {
  const setError = useAppData.getState().setError;

  try {
   await axios.delete(`${API_URL}${variant}/${id}`);
  } catch (e) {
    setError(true);
    console.log('ERROR', e);
  }
};
