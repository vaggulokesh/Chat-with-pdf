import './App.css';
import Navigation from './Components/Navigation';
import { Route,Routes } from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Bot from './Pages/ChatBot/Chatbot';
import RegisterForm from './Pages/RegisterForm/RegisterForm';
function App() {
  return (
    <>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/FAQ' element={<About/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Register' element={<RegisterForm/>}></Route>
      <Route path='/Bot' element={<Bot/>}></Route>
    </Routes>
  
    </>
  );
}

export default App;
