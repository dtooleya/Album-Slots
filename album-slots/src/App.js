import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Body from './components/body';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Body />
    </div>
  );
}

export default App;
