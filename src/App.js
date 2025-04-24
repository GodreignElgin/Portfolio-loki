import './App.css';
import { sampleModels } from './data/sampleModels';
import ModelGrid from './components/ModelGrid';


function App() {
  return (
    <div className="App">
      <h1>3D Model Viewer</h1>
      <ModelGrid models={sampleModels} />
    </div>
  );
}

export default App;
