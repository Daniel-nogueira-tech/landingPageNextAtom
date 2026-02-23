import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Learn from './components/Learn/Learn';
import Download from './components/Download/Download';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import { PageContext } from './Contexts/PageContext';
import LoginPopup from './components/LoginPopup/LoginPopup';

function App() {
  const { isLoginPopupOpen } = React.useContext(PageContext);


  return (
    <>
      {isLoginPopupOpen && <LoginPopup />}
      <div className="App">
        <Navbar />
        <main>
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
