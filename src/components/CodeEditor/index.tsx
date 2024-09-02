import { useContext } from 'react';
import Editor from '../Editor';
import FileNameList from '../FileNameList';
import { PlaygroundContext } from '../../PlaygroundContext';

export default function CodeEditor() {
  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext);
  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    console.log(value);
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
}
