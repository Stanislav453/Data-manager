import axios from "axios";
import { API_URL } from "../url";
import { useEffect } from "react";
import { useAppData } from "../../store/useAppData";

export const useGetAction = (variant: string) => {
  const setAppData = useAppData((state) => state.setData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}${variant}`);
        const data = response.data;
        setAppData(data);
      } catch (e) {
        console.log("ERROR", e);
      }
    };

    fetchData();
  }, [variant, setAppData]);
};
