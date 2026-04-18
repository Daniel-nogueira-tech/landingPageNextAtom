import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Learn from './components/Learn/Learn';
import Download from './components/Download/Download';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import { PageContext } from './Contexts/PageContext';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ResetPassword from './components/ResetPassword/ResetPassword';
import EmailVerify from './components/EmailVerify/EmailVerify';
import MainPage from './pages/MainPage/MainPage';
import ArtigoCompleto from './components/ArtigoCompleto/ArtigoCompleto';
import VerTodasNoticias from './components/VerTodasNoticias/VerTodasNoticias';
import NoticiaAberta from './components/NoticiaAberta/NoticiaAberta';
import Forum from './components/Forum/Forum';
import ForumTopic from './components/ForumTopic/ForumTopic';
import Plans from './components/Plans/Plans';

function App() {
  const { isLoginPopupOpen } = React.useContext(PageContext);
  const location = useLocation();

  return (
    <>
      {isLoginPopupOpen && <LoginPopup />}
      <div className="App">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<MainPage />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/email-verify' element={<EmailVerify />} />
              <Route path='/aprender/:id' element={<ArtigoCompleto />} />
              <Route path='/noticias' element={<VerTodasNoticias />} />
              <Route path='/noticias/:slug' element={<NoticiaAberta />} />
              <Route path='/forum' element={<Forum />} />
              <Route path='/forum/topic/:id' element={<ForumTopic />} />
              <Route path='/planos' element={<Plans />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
