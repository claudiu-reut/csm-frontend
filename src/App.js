import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Acasa from './pages/Acasa/Acasa'
import Calendar from './pages/Calendar/Calendar'
import ContactForm from './pages/Contact/ContactForm'
import Detalii from './pages/Detalii/Detalii'
import Juvenil from './pages/Juvenil/Juvenil'
import Noutati from './pages/Noutati/Noutati'
import Sponsori from './pages/Sponsori/Sponsori'
import Login from './pages/SignIn/Login'
import Register from './pages/SignIn/Register'
import Home from './pages/Home/Home'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path='/acasa' element={<Acasa />} />
        <Route path='/' element={<Navigate to='/acasa' />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/contact' element={<ContactForm />} />
        <Route path='/detalii' element={<Detalii />} />
        <Route path='/juvenil' element={<Juvenil />} />
        <Route path='/noutati' element={<Noutati />} />
        <Route path='/sponsori' element={<Sponsori />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
