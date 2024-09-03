import { DownloadOutlined } from '@ant-design/icons';
import { downloadFiles } from '../../utils';
import { message } from 'antd';
import { PlaygroundContext } from '../../PlaygroundContext';
import { useContext } from 'react';

export function DownloadCode() {
  const { files } = useContext(PlaygroundContext);
  return (
    <DownloadOutlined
      className="mr-4 text-2xl"
      onClick={async () => {
        await downloadFiles(files);
        message.success('下载完成');
      }}
    />
  );
}
