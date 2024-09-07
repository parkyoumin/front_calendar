import React, { ReactNode } from "react";

type CardProps = {
  iconSrc: string;
  title: string;
  children: ReactNode;
};

const Card = ({ iconSrc, title, children }: CardProps) => {
  return (
    <div className="bg-white border border-normal-gray rounded-md p-4 mb-8">
      <div className="flex items-center justify-center">
        <img src={iconSrc} className="pr-2" />
        <span className="font-medium text-lg text-normal-black">{title}</span>
      </div>
      <div className="border border-normal-gray mx-10 my-5"></div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
