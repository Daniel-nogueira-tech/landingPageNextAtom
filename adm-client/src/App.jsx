import MainPage from './Pages/MainPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LearningContent from './Components/LearningContent/LearningContent'
import ManageNews from './Components/ManageNews/ManageNews'
import LearningAdd from './Components/LearningAdd/LearningAdd'
import AddNews from './Components/AddNews/AddNews'
import ManageForum from './Components/ManageForum/ManageForum'
import ManageUsers from './Components/ManageUser/ManageUsers'
import LoginPage from './Components/LoginPage/LoginPage'
import Settings from './Components/Settings/Settings'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import EmailVefify from './Components/EmailVefify/EmailVefify'
import InvitationAdmin from './Components/InvitationAdmin/InvitationAdmin'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/learning-content" element={<LearningContent />} />
        <Route path="/manage-news" element={<ManageNews />} />
        <Route path="/learning-add" element={<LearningAdd />} />
        <Route path="/news-add" element={<AddNews />} />
        <Route path="/manage-forum" element={<ManageForum />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/email-verify-admin" element={<EmailVefify />} />
        <Route path="/invitation-admin" element={<InvitationAdmin />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
