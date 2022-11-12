import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Acasa from './pages/Acasa';
import Detalii from './pages/Detalii';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/acasa' exact component={Acasa}/>
        <Route path='/detalii' exact component={Detalii}/>
      </Routes>
    </Router>
   
  );
}

export default App;
