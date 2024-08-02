import axios from "axios";
import { API_URL } from "../url";
import { useAppData } from "../../store/useAppData";

type deleteActionType = {
  variant: string;
  id: string;
};

export const deleteAction = ({ variant, id }: deleteActionType) => {
  // const deleteData = useAppData((state) => state.filterData);

  try {
    axios.delete(`${API_URL}${variant}/${id}`);

    console.log(`${API_URL}${variant}/${id}`);

    // const data = response.data;
    // deleteData(id);
  } catch (e) {
    console.log("ERROR", e);
  }
};
