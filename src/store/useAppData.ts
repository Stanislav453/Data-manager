import { create } from "zustand";
import { type DataType } from "../type";

type UseAppDataType = {
  data: DataType[];
  filterData: DataType[];
  setData: (data: DataType[]) => void;
  deleteData: (id: string) => void;
};

export const useAppData = create<UseAppDataType>()((set) => ({
  data: [],
  filterData: [],

  setData: (data) =>
    set(() => ({
      data: data,
      filterData: data,
    })),

  deleteData: (id) =>
    set((state) => ({
      filterData: state.filterData.filter((oneResult) => oneResult.id !== id),
    })),
}));
