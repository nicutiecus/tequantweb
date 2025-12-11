import { Route, Routes } from 'react-router-dom';
import Footer from './footer';
import Navbar from './navbar';
import HomePage from './home';
import BlogPage from './blog/blogLanding';
import CoursesPage from './courses';
import DataAnalyticsLandingPage from './marketing/dataAnalytics';
import AboutPage from './aboutPage';
import SoftwareDevLanding from './marketing/softwareDevLanding';
import EnrollmentPage from './marketing/enrollment';

function Main() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>

      <Route path ="/" element= {<HomePage/>}/>
      <Route path ="/blog" element ={<BlogPage/>}/>
      <Route path ="/courses" element = {<CoursesPage/>}/>
      <Route path ="/marketing-data-analytics" element={<DataAnalyticsLandingPage/>}/>
      <Route path ="/about" element= {<AboutPage/>}/>
      <Route path ="/marketing-software-dev" element= {<SoftwareDevLanding/>}/>
      <Route path = "/enrollment" element= {<EnrollmentPage/>}/>

      </Routes>


      <Footer/>
      
    </div>
  );
}

export default Main;
