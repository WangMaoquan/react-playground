import React, { useEffect, useState } from 'react';
export interface MessageProps {
  type: 'error' | 'warn';
  content: string;
}

export const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return visible ? (
    <div
      className={`absolute right-2 bottom-0 left-2 z-10 flex max-h-[calc(100%-300px)] min-h-2.5 mb-2 border-2 border-white rounded-lg ${
        type === 'error'
          ? 'text-[#fef0f0] bg-[#f56c6c] border-[#fef0f0]'
          : 'text-[#e6a23c] bg-[#fdf6ec] border-[#e6a23c]'
      }`}
    >
      <pre
        dangerouslySetInnerHTML={{ __html: content }}
        className="p-3 px-5 m-0 overflow-auto whitespace-pre-wrap"
      ></pre>
      <button
        className={`absolute top-0.5 right-0.5 block w-[1.125rem] h-[1.125rem] p-0 text-[0.5625rem] leading-[1.125rem] text-center cursor-pointer border-0 rounded-[0.5625rem] ${
          type === 'error'
            ? 'text-[#fef0f0] bg-[#f56c6c]'
            : 'text-[#e6a23c] bg-[#fdf6ec]'
        }`}
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  ) : null;
};
