import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
import { FileNameItem } from '../FileNameItem';
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from '../../files';

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

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  const handleEditComplete = (name: string, prevName: string) => {
    if (name !== prevName) {
      updateFileName(prevName, name);
      setSelectedFileName(name);
    }
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
          onRemove={() => {
            handleRemove(item);
          }}
          readonly={readonlyFileNames.includes(item)}
        ></FileNameItem>
      ))}
      <div className="" onClick={addTab}>
        +
      </div>
    </div>
  );
}
