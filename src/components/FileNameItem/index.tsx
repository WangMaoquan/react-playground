import { Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
  onEditComplete: (filename: string) => void;
  create: boolean;
  onRemove: () => void;
  readonly: boolean;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    actived = false,
    onClick,
    onEditComplete,
    create,
    onRemove,
    readonly,
  } = props;

  const [editing, setEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(value);

  const [creating, setCreating] = useState(create);

  const handleDoubleClick = () => {
    if (readonly) {
      return;
    }
    setEditing(true);
    // 异步保证能获取到inputRef
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const onBlur = () => {
    setEditing(false);
    onEditComplete(name);
    setCreating(false);
  };

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);

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
        <>
          <span onDoubleClick={handleDoubleClick} className="dark:text-white">
            {name}
          </span>
          {!readonly && (
            <Popconfirm
              title="确认删除该文件吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={(e) => {
                e?.stopPropagation();
                onRemove();
              }}
            >
              <span className="flex ml-[0.3125rem]">
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          )}
        </>
      )}
    </div>
  );
};
