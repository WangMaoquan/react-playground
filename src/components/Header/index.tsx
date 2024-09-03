import logoSvg from '../../assets/react.svg';
import { ShareLink } from '../ShareLink';
import { ThemeSwitch } from '../ThemeSwitch';
import { DownloadCode } from '../DownloadCode';

export default function Header() {
  return (
    <div className="h-[3.125rem] px-5 border-b border-black flex items-center justify-between box-border dark:bg-black dark:text-white">
      <div className="flex items-center text-xl">
        <img alt="logo" src={logoSvg} className="h-6 mr-[0.625rem]" />
        <span>React Playground</span>
      </div>
      <div className="flex">
        <DownloadCode />
        <ShareLink />
        <ThemeSwitch />
      </div>
    </div>
  );
}
