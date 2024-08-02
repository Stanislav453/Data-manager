import { useAppData } from "../store/useAppData";
import { CustomButton } from "./CustomButton";
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { DataType } from "../type";
import { deleteAction } from "../api/actions/deleteAction";
import { useState } from "react";

type ItemProps = {
  data: DataType[];
  variant: string;
};

export const Item = ({ data, variant }: ItemProps) => {
  const [id, setId] = useState("");
  const updateData = useAppData((state) => state.deleteData);

  // useDeleteAction({ variant, id });

  const handleDeleteData = (id: string) => {
    updateData(id);
    deleteAction({ variant, id });
  };

  return data.map((oneResult, index) => {
    const { id, name, gender, banned, age, type } = oneResult;

    const isBanned = banned ? "Unbaned" : "banned";
    const isBannedColor = banned ? "bg-green-500" : "bg-red-500";

    return (
      <li
        key={index}
        className={`flex w-full justify-between  items-center p-4  list-none ${
          banned && "border-red-500"
        } border-2 border-slate-300	 `}
      >
        <div className="flex  gap-2 w-full">
          <h2>
            <span className="font-bold"> Name: </span>
            {name}
          </h2>
          {gender && (
            <p>
              <span className="font-bold"> Gender: </span>
              {gender}
            </p>
          )}
          {age && (
            <p>
              <span className="font-bold"> Age: </span>
              {age}
            </p>
          )}
          {type && (
            <p>
              <span className="font-bold"> Type: </span>
              {type}
            </p>
          )}
        </div>
        <div className="flex">
          <CustomButton>
            <FaPencil className="text-3xl text-orange-500" />
          </CustomButton>
          <CustomButton action={() => handleDeleteData(id)}>
            <FaRegTrashCan className="text-3xl text-red-500" />
          </CustomButton>
          {gender && (
            <CustomButton customStyle={isBannedColor}>{isBanned}</CustomButton>
          )}
        </div>
      </li>
    );
  });
};
