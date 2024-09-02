import React, { useState } from 'react';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick } = props;

  const [name] = useState(value);

  return (
    <div
      className={`inline-flex py-2 px-3 text-[0.8125rem] leading-[1.25rem] cursor-pointer items-center border-b-[0.1875rem] border-transparent whitespace-nowrap ${
        actived ? 'text-sky-400 border-sky-400' : ''
      }`}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
