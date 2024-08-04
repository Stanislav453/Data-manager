import axios from 'axios';
import { API_URL } from '../url';

type deleteActionType = {
  variant: string;
  id: string;
};

export const deleteAction = ({ variant, id }: deleteActionType) => {
  try {
    axios.delete(`${API_URL}${variant}/${id}`);
  } catch (e) {
    console.log('ERROR', e);
  }
};
