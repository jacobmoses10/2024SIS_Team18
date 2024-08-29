import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Toolbox from './components/Toolbox';
import Whiteboard from './components/Whiteboard';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Whiteboard></Whiteboard>
    </div>
  );
}

export default App;
