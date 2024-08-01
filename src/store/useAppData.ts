import { create } from "zustand";
import { type DataType } from "../type";

type UseAppDataType = {
  data: DataType[];
  setData: (data: DataType[]) => void;
};

export const useAppData = create<UseAppDataType>()((set) => ({
  data: [],

  setData: (data) =>
    set(() => ({
      data: data,
    })),
}));
