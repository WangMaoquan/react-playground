import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate';

export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || '';
  if (['js', 'jsx'].includes(suffix)) return 'javascript';
  if (['ts', 'tsx'].includes(suffix)) return 'typescript';
  if (['json'].includes(suffix)) return 'json';
  if (['css'].includes(suffix)) return 'css';
  return 'javascript';
};

/**
 * 生成链接后面的hash
 * @param data
 * @returns
 */
export function compress(data: string): string {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const str = strFromU8(zipped, true);
  return btoa(str);
}

/**
 * hash装换回文件
 * @param base64
 * @returns
 */
export function uncompress(base64: string): string {
  const binary = atob(base64);

  const buffer = strToU8(binary, true);
  const unzipped = unzlibSync(buffer);
  return strFromU8(unzipped);
}
