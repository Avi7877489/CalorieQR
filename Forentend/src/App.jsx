import { useDisclosure } from '@chakra-ui/react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login ';
import SignUp from './Components/Pages/SignUp';
import HomePage from './Components/Pages/HomePage';
import About from './Components/Pages/About';
import Services from './Components/Pages/Services';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        <Router>
      <Navbar onOpen={onOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose}/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Home' element={<HomePage/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      <Footer />
    </Router>
    </>
  );
};

export default App;
