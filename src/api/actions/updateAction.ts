import axios from 'axios';
import { API_URL } from '../url';
import { useAppData } from '../../store/useAppData';

type postActionType = {
  variant: string;
  id: string;
};

export const updateAction = async ({ variant, id }: postActionType) => {
  const { filterData, updateBan } = useAppData.getState();
  const filterItem = filterData.find((item) => item.id == id);
  const newBan = filterItem?.banned;
  
  try {
      const response = await axios.patch(`${API_URL}${variant}/${id}`, {
          banned: !newBan,
        });
        console.log('this is response from PUT', response.data);
        updateBan(id);
  } catch (e) {
    console.log('ERROR', e);
  }
  console.log('This is API link', `${API_URL}${variant}/${id}`);
};
