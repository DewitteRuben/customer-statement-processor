import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      className={`text-white bg-orange-600 hover:bg-orange-700 disabled:hover:bg-orange-600 disabled:opacity-15 disabled:cursor-not-allowed focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
