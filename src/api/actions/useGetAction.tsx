import axios from 'axios';
import { API_URL } from '../url';
import { useEffect } from 'react';
import { useAppData } from '../../store/useAppData';

type UseGetActionType = {
  variant: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useGetAction = ({ variant, setLoading }: UseGetActionType) => {
  const setAppData = useAppData((state) => state.setData);
  const setError = useAppData((state) => state.setError);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}${variant}`);
        const data = response.data;
        setAppData(data);
      } catch (e) {
        setError(true);
        console.log('ERROR', e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [variant, setAppData, setLoading, setError]);
};
