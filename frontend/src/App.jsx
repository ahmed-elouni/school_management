import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home';
import AdminUser from '../src/components/AdminUser';
import AdminSignin from './components/AdminSignin';
import AdminRegister from './components/AdminRegister';
import AdminDashboard from './pages/Admin/Dashboard';
import Classes from './pages/Admin/Classes';
import Exam from './pages/Admin/Exam';
import Attendance from './pages/Admin/Attendance';
import Performance from './pages/Admin/Performance';
import Teachers from './pages/Admin/Teachers';
import Students from './pages/Admin/Students';
import EmploiduTemps from './pages/Admin/Emploidutemps'; 
import EventCalendar from './pages/Admin/EventCalendar';
import SettingsProfile from './pages/Admin/SettingsProfile';
import SIdebar from './pages/Admin/SIdebar';
import Annonce from './pages/Admin/Announcment';
import StudentList from './pages/Admin/StudentList';
import MatieresDisciplines from './pages/Admin/cours';
import Contact from './components/contact';
import About from'./components/about';

import './App.css'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/admin-user" element ={<AdminUser/>} />
        <Route exact path="/admin-signIn" element ={<AdminSignin/>} />
        <Route exact path="/Admin-Register" element ={<AdminRegister/>} />
        <Route exact path="/admin/dashboard" element ={<AdminDashboard/>} />

        <Route exact path="/admin/classes" element ={<Classes/>} />
        <Route exact path="/admin/exams" element ={<Exam/>} />
        <Route exact path="/admin/attendance" element ={<Attendance/>} />
        <Route exact path="/admin/performance" element ={<Performance/>} />
        <Route exact path="/admin/teachers" element ={<Teachers/>} />
        <Route exact path="/admin/students" element ={<Students/>} />
        <Route exact path="/admin/emploidutemps" element ={<EmploiduTemps/>} />
        <Route exact path="/admin/communication" element ={<Annonce/>} />
        <Route exact path="/admin/events" element ={<EventCalendar/>} />
        <Route exact path="/admin/settingsprofile" element ={<SettingsProfile/>} />
        <Route exact path="/admin/studentlist" element ={<StudentList/>} />
        <Route path="/admin/matieresdisciplines" element={<MatieresDisciplines />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/a-propos" element={<About />} />







        </Routes>
    </Router>
  )
}

export default App
