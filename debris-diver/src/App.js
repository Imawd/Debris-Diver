import './App.css';
import Intro from './Components/Intro/Intro';
import Logo from './Components/Logo/Logo';
import ObjectInfo from './Components/ObjectInfo/ObjectInfo';
import Score from './Components/Score/Score';

function App() {
  return (
    <div className="App">
      <Logo/>
      <Score/>
      <ObjectInfo/>
    </div>
  );
}

export default App;
