import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { FileNameItem } from '../FileNameItem';

export default function FileNameList() {
  const { files, setSelectedFileName, selectedFileName, updateFileName } =
    useContext(PlaygroundContext);

  const [tabs, setTabs] = useState(['']);

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
  };

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className="flex flex-none flex-basis-9 items-center h-[2.375rem] verflow-x-auto overflow-y-hidden border-b border-[#ddd] text-[#444] bg-white box-border filenamelist-scrollbar sticky top-0">
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
        ></FileNameItem>
      ))}
    </div>
  );
}
