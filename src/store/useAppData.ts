import { create } from "zustand";
import { type DataType } from "../type";

type UseAppDataType = {
  data: DataType[];
  filterData: DataType[];
  setData: (data: DataType[]) => void;
};

export const useAppData = create<UseAppDataType>()((set) => ({
  data: [],
  filterData: [],

  setData: (data) =>
    set(() => ({
      data: data,
      filterData: data,
    })),
}));
