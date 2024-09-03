import { useContext, useEffect, useRef, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';
// import { compile } from './compiler.worker';
// import Editor from '../Editor';
import iframeRaw from '../../assets/iframe.html?raw';
import { IMPORT_MAP_FILE_NAME } from '../../files';
import { Message } from '../Message';
import CompilerWorker from './compiler.worker?worker';
import { debounce } from 'lodash-es';

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}

export default function Preview() {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState('');
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());
  const [error, setError] = useState('');
  const compilerWorkerRef = useRef<Worker>();

  // useEffect(() => {
  //   const res = compile(files);
  //   setCompiledCode(res);
  // }, [files]);

  function getIframeUrl() {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`,
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`,
      );
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }));
  }

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data;
    if (type === 'ERROR') {
      setError(message);
    } else {
      setError('');
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener('message', ({ data }) => {
        console.log('worker', data);
        if (data.type === 'COMPILED_CODE') {
          setCompiledCode(data.data);
        } else {
          //console.log('error', data);
        }
      });
    }
  }, []);

  useEffect(
    debounce(() => {
      compilerWorkerRef.current?.postMessage(files);
    }, 500),
    [files],
  );

  return (
    <div className="h-full">
      <iframe src={iframeUrl} className="w-full h-full p-0 border-none" />
      {/* <Editor
        file={{
          name: 'dist.js',
          value: compiledCode,
          language: 'javascript',
        }}
      /> */}
      {error && <Message type="warn" content={error} />}
    </div>
  );
}
