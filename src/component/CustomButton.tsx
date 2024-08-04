import { ReactNode } from "react";

type CustomButtonType = {
  children: ReactNode;
  customStyle?: string;
  action?: () => void;
  type?: "submit" | "button" 
};

export const CustomButton = ({
  children,
  customStyle,
  action,
  type
}: CustomButtonType) => {
  return (
    <button
      onClick={action}
      type={type}
      className={` py-2 px-4 text-white ${customStyle} rounded-full hover:scale-110 transition-transform `}
    >
      {children}
    </button>
  );
};
