export type DataType = {
  id?: string;
  name: string;
  gender?: string;
  banned?: boolean;
  type?: string;
  age?: number;
};

type ItemsUsersType = {
  name: string;
  gender?: string;
};

type ItemsAnimalsType = {
  name: string;
  age?: number;
  type?: string;
};

export type ItemsFormType = ItemsAnimalsType | ItemsUsersType
