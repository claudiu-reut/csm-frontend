import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Acasa from './pages/Acasa'
import Calendar from './pages/Calendar'
import Contact from './pages/Contact'
import Detalii from './pages/Detalii'
import Juvenil from './pages/Juvenil'
import Noutati from './pages/Noutati'
import Sponsori from './pages/Sponsori'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path='/acasa' element={<Acasa />} />
        <Route path='/' element={<Navigate to='/acasa' />} />

        <Route path='/calendar' element={<Calendar />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/detalii' element={<Detalii />} />
        <Route path='/juvenil' element={<Juvenil />} />
        <Route path='/noutati' element={<Noutati />} />
        <Route path='/sponsori' element={<Sponsori />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
