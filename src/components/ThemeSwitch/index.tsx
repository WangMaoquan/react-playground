import { useContext, useEffect } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { PlaygroundContext } from '../../PlaygroundContext';

type Theme = 'dark' | 'light';

export function ThemeSwitch() {
  const { theme, setTheme } = useContext(PlaygroundContext);

  const items: MenuProps['items'] = [
    {
      label: (
        <div
          className="flex justify-between w-20 text-xl"
          onClick={() => handleClick('light')}
        >
          <SunOutlined className="text-xl" /> <p>Light</p>
        </div>
      ),
      key: 'light',
    },
    {
      label: (
        <div
          className="flex justify-between w-20 text-xl"
          onClick={() => handleClick('dark')}
        >
          <MoonOutlined className="text-xl" /> <p>Dark</p>
        </div>
      ),
      key: 'dark',
    },
  ];

  function handleClick(theme: Theme) {
    setTheme(theme);
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      {theme === 'light' ? (
        <SunOutlined className="text-2xl" />
      ) : (
        <MoonOutlined className="text-2xl dark:text-white" />
      )}
    </Dropdown>
  );
}
