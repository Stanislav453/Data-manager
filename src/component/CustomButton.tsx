import React, { ReactNode } from "react";

type CustomButtonType = {
  children: ReactNode;
  customStyle?: string;
  action?: () => void;
};

export const CustomButton = ({
  children,
  customStyle,
  action,
}: CustomButtonType) => {
  return (
    <button
      onClick={action}
      type='submit'
      className={` py-2 px-4 text-white ${customStyle} rounded-full hover:scale-110 transition-transform `}
    >
      {children}
    </button>
  );
};
