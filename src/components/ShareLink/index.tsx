import { ShareAltOutlined } from '@ant-design/icons';
import { message } from 'antd';
import copy from 'copy-to-clipboard';

export function ShareLink() {
  return (
    <ShareAltOutlined
      className="mr-[0.625rem] text-2xl"
      onClick={() => {
        copy(window.location.href);
        message.success('分享链接已复制。');
      }}
    />
  );
}
