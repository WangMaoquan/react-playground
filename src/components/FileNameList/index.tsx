import { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../../PlaygroundContext';

export default function FileNameList() {
  const { files } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState(['']);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div>
      {tabs.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
}
