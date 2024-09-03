import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { FileNameItem } from '../FileNameItem';
import { ENTRY_FILE_NAME } from '../../files';

export default function FileNameList() {
  const {
    files,
    setSelectedFileName,
    selectedFileName,
    updateFileName,
    addFile,
    removeFile,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState(['']);

  const [create, setCreate] = useState(false);

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
    setCreate(false);
  };

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const addTab = () => {
    const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx';
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreate(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  return (
    <div className="flex flex-none flex-basis-9 items-center h-[2.375rem] verflow-x-auto overflow-y-hidden border-b border-[#ddd] text-[#444] bg-white box-border filenamelist-scrollbar sticky top-0">
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          create={create && index === tabs.length - 1}
          onRemove={(e) => {
            e.stopPropagation();
            handleRemove(item);
          }}
        ></FileNameItem>
      ))}
      <div className="" onClick={addTab}>
        +
      </div>
    </div>
  );
}
