import { Route, Routes } from 'react-router-dom';
import logo from '../logo.svg';
import Footer from './footer';
import Navbar from './navbar';
import HomePage from './home';
import BlogPage from './blog/blogLanding';

function Main() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>

      <Route path ="/" element= {<HomePage/>}/>
      <Route path ="/blog" element ={<BlogPage/>}/>

      </Routes>


      <Footer/>
      
    </div>
  );
}

export default Main;
