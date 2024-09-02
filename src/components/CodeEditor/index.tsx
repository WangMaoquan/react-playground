import { useContext } from 'react';
import Editor from '../Editor';
import FileNameList from '../FileNameList';
import { PlaygroundContext } from '../../PlaygroundContext';

export default function CodeEditor() {
  const { files, selectedFileName } = useContext(PlaygroundContext);
  const file = files[selectedFileName];

  function onEditorChange() {
    // eslint-disable-next-line prefer-rest-params
    console.log(...arguments);
  }

  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
}
