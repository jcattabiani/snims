import './App.css';
import Snail from './components/Snail';
import World from './components/World';

function App() {
  return (
    <div>
      <World />
      <Snail color="green" name="Speedy" />
      <Snail color="blue" name="Squiggles" />
      <Snail color="red" name="Flash" />
    </div>
  );
}

export default App;
