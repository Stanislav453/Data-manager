import { create } from 'zustand';
import { type DataType } from '../type';

type UseAppDataType = {
  data: DataType[];
  filterData: DataType[];
  error: boolean;
  setData: (data: DataType[]) => void;
  deleteData: (id: string) => void;
  updateData: (item: DataType) => void;
  updateBan: (id: string) => void;
  editItem: (id: string, changeItem: DataType) => void;
  filterItems: (itemName: string) => void;
  updatePostData: (oneItem: DataType) => void;
  setError: (value: boolean) => void
};

export const useAppData = create<UseAppDataType>()((set) => ({
  data: [],
  filterData: [],
  error: false,

  setData: (data) =>
    set(() => ({
      data: data,
      filterData: data,
    })),

  updatePostData: (oneItem) =>
    set((state) => ({
      data: [oneItem, ...state.data],
      filterData: [oneItem, ...state.filterData],
    })),

  filterItems: (itemName) =>
    set((state) => ({
      filterData: state.data.filter((item) =>
        item.name.toLowerCase().includes(itemName.toLowerCase())
      ),
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

  setError: (value) =>
    set(() => ({
      error: value,
    })),
}));
