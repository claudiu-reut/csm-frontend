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
import Istorie from './pages/Detalii/Istorie/Istorie'
import Viziune from './pages/Detalii/Viziune/Viziune'
import Trofee from './pages/Detalii/Trofee/Trofee'
import Personal from './pages/Detalii/Personal/Personal'
import Junior from './pages/Juvenil/Junior/Junior'
import Cadet from './pages/Juvenil/Cadet/Cadet'
import Sperante from './pages/Juvenil/Sperante/Sperante'
import Noutati from './pages/Noutati/Noutati'
import Sponsori from './pages/Sponsori/Sponsori'
import Login from './pages/SignIn/Login'
import Register from './pages/SignIn/Register'
import AddSponsor from './pages/Sponsori/AddSponsor/AddSponsor'
import Home from './pages/Home/Home'
import Footer from './components/Footer'
import Admin from './pages/Admin/Admin'
import CreatorContinut from './pages/CreatorContinut/CreatorContinut'
import DeleteUser from './pages/Admin/DeleteUser'
import DeleteSponsor from './pages/Admin/DeleteSponsor'
import EditSponsor from './pages/Admin/EditSponsor'
import EditUser from './pages/Admin/EditUser'
import ProtectedRoutes from './components/ProtectedRoutes'
import AdminRoutes from './components/AdminRoutes'
import NotFound from './pages/NotFound/NotFound'
import AddPost from './pages/Noutati/AddPost/AddPost'
import DeletePost from './pages/Noutati/DeletePost'
import EditPost from './pages/Noutati/EditPost'
import SinglePost from './pages/Noutati/SinglePost/SinglePost'
import SingleMatch from './pages/Calendar/SingleMatch/SingleMatch'
import AddTeam from './pages/Teams/AddTeam'
import AddMeci from './pages/Calendar/Meci/AddMeci'
import DeleteMeci from './pages/Calendar/Meci/DeleteMeci'
import EditMeci from './pages/Calendar/Meci/EditMeci'
import EditTeam from './pages/Teams/EditTeam'
import DeleteTeam from './pages/Teams/DeleteTeam'
function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path='/acasa' element={<Acasa />} />
        <Route path='/' element={<Navigate to='/acasa' />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/calendar/:id' element={<SingleMatch />} />
        <Route path='/contact' element={<ContactForm />} />
        <Route path='/detalii' element={<Detalii />} />
        <Route path='/detalii/personal' element={<Personal />} />
        <Route path='/detalii/istorie' element={<Istorie />} />
        <Route path='/detalii/viziune' element={<Viziune />} />
        <Route path='/detalii/trofee' element={<Trofee />} />
        <Route path='/juvenil' element={<Juvenil />} />
        <Route path='/juvenil/sperante' element={<Sperante />} />
        <Route path='/juvenil/cadet' element={<Cadet />} />
        <Route path='/juvenil/junior' element={<Junior />} />
        <Route path='/noutati' element={<Noutati />} />
        <Route path='/noutati/:id' element={<SinglePost />} />
        <Route path='/sponsori' element={<Sponsori />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<NotFound />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/addsponsor' element={<AddSponsor />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/users/delete/:id' element={<DeleteUser />} />
            <Route path='/sponsors/delete/:id' element={<DeleteSponsor />} />
            <Route path='/sponsors/:id' element={<EditSponsor />} />
            <Route path='/users/:id' element={<EditUser />} />
          </Route>
          <Route path='/creatorcontinut' element={<CreatorContinut />} />
          <Route path='/noutati/addpost' element={<AddPost />} />
          <Route path='/noutati/delete/:id' element={<DeletePost />} />
          <Route path='/noutati/edit/:id' element={<EditPost />} />
          <Route path='/teams/addteam' element={<AddTeam />} />
          <Route path='/teams/edit/:id' element={<EditTeam />} />
          <Route path='/teams/delete/:id' element={<DeleteTeam />} />
          <Route path='/calendar/addmatch' element={<AddMeci />} />
          <Route path='/calendar/delete/:id' element={<DeleteMeci />} />
          <Route path='/calendar/edit/:id' element={<EditMeci />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
