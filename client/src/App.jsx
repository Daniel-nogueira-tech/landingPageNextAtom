import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Learn from './components/Learn/Learn';
import Download from './components/Download/Download';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import { PageContext } from './Contexts/PageContext';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './components/ResetPassword/ResetPassword';
import EmailVerify from './components/EmailVerify/EmailVerify';

function App() {
  const { isLoginPopupOpen } = React.useContext(PageContext);


  return (
    <>
      {isLoginPopupOpen && <LoginPopup />}
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/email-verify' element={<EmailVerify />} />
          </Routes>
          <Home />
          <Learn />
          <Download />
          <News />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
