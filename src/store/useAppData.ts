import { create } from 'zustand';
import { type DataType } from '../type';

type UseAppDataType = {
  data: DataType[];
  filterData: DataType[];
  setData: (data: DataType[]) => void;
  deleteData: (id: string) => void;
  updateData: (item: DataType) => void;
  updateBan: (id: string) => void;
  editItem: (id: string, changeItem: DataType) => void;
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

  updateData: (item) =>
    set((state) => ({
      filterData: [...state.filterData, item],
    })),

  updateBan: (id) =>
    set((state) => ({
      filterData: state.filterData.map((oneItem) =>
        oneItem.id === id ? { ...oneItem, banned: !oneItem.banned } : oneItem
      ),
    })),

  editItem: (id, changeItem) =>
    set((state) => ({
      filterData: state.filterData.map((oneItem) =>
        oneItem.id === id ? { ...oneItem, ...changeItem } : oneItem
      ),
    })),
}));
