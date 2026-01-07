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
import TeacherDashboard from './Teacher/teacherDashboard';
import EditCourseDetails from './editCourseDetails';
import StudentLoginPage from './Student/studentLogin';
import StudentDashboard from './Student/studentDashboard';
import CourseDetailPage from './courseDetail';

function Main() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>

      <Route path ="/" element= {<HomePage/>}/>
      <Route path ="/blog" element ={<BlogPage/>}/>
      <Route path ="/courses" element = {<CoursesPage/>}/>
      <Route path ="/course-details/:course_id" element = {<CourseDetailPage/>}/>
      <Route path ="/marketing-data-analytics" element={<DataAnalyticsLandingPage/>}/>
      <Route path ="/about" element= {<AboutPage/>}/>
      <Route path ="/marketing-software-dev" element= {<SoftwareDevLanding/>}/>
      <Route path = "/enrollment" element= {<EnrollmentPage/>}/>
      <Route path ="/teacher-dashboard" element= {<TeacherDashboard/>}/>
      <Route path ="/edit-course-details" element= {<EditCourseDetails/>}/>
      <Route path ="/student-login" element= {<StudentLoginPage/>}/>
      <Route path ="/student-dashboard" element= {<StudentDashboard/>}/>
       

      </Routes>


      <Footer/>
      
    </div>
  );
}

export default Main;
