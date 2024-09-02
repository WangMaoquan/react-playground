import MonacoEditor, {
  OnMount,
  EditorProps as EdProps,
} from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { createATA } from './ata';

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface EditorProps {
  file: EditorFile;
  onChange?: EdProps['onChange'];
  options?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: EditorProps) {
  // onMount 也就是编辑器加载完的回调里，设置 ts 的默认 compilerOptions
  const handleEditorMount: OnMount = (editor, monaco) => {
    // 注册快捷键 获取所有的快捷键editor.getSupportedActions().map((a) => a.id)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true, // 设置 esModuleInterop 会在编译的时候自动加上 default 属性
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`,
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height="100%"
      path={props.file.name}
      language={props.file.language}
      onMount={handleEditorMount}
      onChange={props.onChange}
      value={props.file.value}
      options={{
        fontSize: 14, // 字体大小
        scrollBeyondLastLine: false, // 取消编辑器右侧的滚动条
        minimap: {
          enabled: false,
        }, // 缩略图
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        }, // 滚动条样式
      }}
    />
  );
}
