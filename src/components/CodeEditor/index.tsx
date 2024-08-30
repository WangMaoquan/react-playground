import Editor from '../Editor';
import FileNameList from '../FileNameList';

export default function CodeEditor() {
  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor />
    </div>
  );
}
