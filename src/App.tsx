import { PlaygroundProvider } from './PlaygroundContext';
import { ReactPlayground } from './ReactPlayground';

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  );
}

export default App;
