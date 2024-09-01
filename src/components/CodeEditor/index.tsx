import Editor from '../Editor';
import FileNameList from '../FileNameList';

export default function CodeEditor() {
  const file = {
    name: 'decade.tsx',
    value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
    language: 'typescript',
  };

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
