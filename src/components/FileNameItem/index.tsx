import React, { useRef, useState } from 'react';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
  onEditComplete: (filename: string) => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick, onEditComplete } = props;

  const [editing, setEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(value);

  const handleDoubleClick = () => {
    setEditing(true);
    // 异步保证能获取到inputRef
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const onBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  return (
    <div
      className={`inline-flex py-2 px-3 text-[0.8125rem] leading-[1.25rem] cursor-pointer items-center border-b-[0.1875rem] border-transparent whitespace-nowrap ${
        actived ? 'text-sky-400 border-sky-400' : ''
      }`}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className="py-1 px-2.5 text-[0.8125rem] text-[#444] bg-[#ddd] border border-[#ddd] rounded outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{name}</span>
      )}
    </div>
  );
};
