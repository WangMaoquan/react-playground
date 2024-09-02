import { setupTypeAcquisition } from '@typescript/ata';
import typescriprt from 'typescript';

const map = new Map<string, string>();

export function createATA(
  onDownloadFile: (code: string, path: string) => void,
) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        if (map.has(path)) {
          return;
        }
        console.log('自动下载的包', path);
        onDownloadFile(code, path);
      },
      finished(files) {
        for (const [k, v] of files) {
          if (!map.has(k)) {
            map.set(k, v);
          }
        }
      },
    },
  });

  return ata;
}
