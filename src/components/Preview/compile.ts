import { transform } from '@babel/standalone';
import { Files } from '../../PlaygroundContext';
import { ENTRY_FILE_NAME } from '../../files';
import { EditorFile } from '../Editor';
import { PluginObj } from '@babel/core';

export const babelTransform = (
  filename: string,
  code: string,
  files: Files,
) => {
  const _code = beforeTransformCode(filename, code);
  let result = '';
  try {
    // 调用 babel 的 transform 方法进行编译
    result = transform(_code, {
      presets: ['react', 'typescript'], // presets 指定 react 和 typescript, 也就是对 jsx 和 ts 语法做处理
      filename,
      plugins: [customResolver(files)],
      retainLines: true, // retainLines 是编译后保持原有行列号不变
    }).code!;
  } catch (e) {
    console.error('编译出错', e);
  }
  return result;
};

/**
 *
 * @param files 文件集
 * @param modulePath 文件路径
 * @returns
 */
const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split('./').pop() || '';
  if (!moduleName.includes('.')) {
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith('.ts') ||
          key.endsWith('.tsx') ||
          key.endsWith('.js') ||
          key.endsWith('.jsx')
        );
      })
      .find((key) => {
        return key.split('.').includes(moduleName);
      });
    if (realModuleName) {
      moduleName = realModuleName;
    }
  }
  return files[moduleName];
};

const json2Js = (file: EditorFile) => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(
    new Blob([js], { type: 'application/javascript' }),
  );
};

const css2Js = (file: EditorFile) => {
  const randomId = new Date().getTime();
  const js = `
(() => {
  const stylesheet = document.createElement('style')
  stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
  document.head.appendChild(stylesheet)

  const styles = document.createTextNode(\`${file.value}\`)
  stylesheet.innerHTML = ''
  stylesheet.appendChild(styles)
})()
  `;
  return URL.createObjectURL(
    new Blob([js], { type: 'application/javascript' }),
  );
};

function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath);
          if (!file) return;

          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file);
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: 'application/javascript',
              }),
            );
          }
        }
      },
    },
  };
}

export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code;
  const regexReact = /import\s+React/g;
  if (
    (filename.endsWith('.jsx') || filename.endsWith('.tsx')) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`;
  }
  return _code;
};

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
