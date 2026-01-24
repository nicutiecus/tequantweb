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
import Checkout from './pages/checkout';
//import CheckoutPage from './pages/checkoutPage';
import NewEnrollmentPage from './pages/enroll';
import StaffLoginPage from './staff/staffLoginPage';
import StaffDashboard from './staff/staffDashboard';
import CreateBlog from './blog/createBlog';
import BlogDetail from './blog/blogDetail';
import CourseStudy from './pages/courseStudy';
import StudentRegister from './Student/studentRegister';
import TeacherLoginPage from './Teacher/teacherLogin';

function Main() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>

      <Route path ="/" element= {<HomePage/>}/>
      <Route path ="/blog" element ={<BlogPage/>}/>
      <Route path ="/blog-post" element ={<BlogDetail/>}/>
      <Route path="/create-blog" element={<CreateBlog/>}/> 
      <Route path ="/courses" element = {<CoursesPage/>}/>
      <Route path ="/course-details/:course_id" element = {<CourseDetailPage/>}/>
      <Route path ="/study/:course_id" element = {<CourseStudy/>}/>
      <Route path ="/marketing-data-analytics" element={<DataAnalyticsLandingPage/>}/>
      <Route path ="/about" element= {<AboutPage/>}/>
      <Route path ="/marketing-software-dev" element= {<SoftwareDevLanding/>}/>
      <Route path = "/enrollment" element= {<EnrollmentPage/>}/>
      <Route path ="/teacher-login" element= {<TeacherLoginPage/>}/>
      <Route path ="/teacher-dashboard" element= {<TeacherDashboard/>}/>
      <Route path ="/edit-course-details" element= {<EditCourseDetails/>}/>
      <Route path ="/student-login" element= {<StudentLoginPage/>}/>
      <Route path ="/student-dashboard" element= {<StudentDashboard/>}/>
      <Route path ="/student-registration" element= {<StudentRegister/>}/>
      <Route path="/checkout/:enrollment_id" element={<Checkout />} />
      <Route path="/enrollment/:course_id" element={<NewEnrollmentPage/>}/>
      <Route path="/staff-login" element={<StaffLoginPage/>}/>
      <Route path="/staff-dashboard" element={<StaffDashboard/>}/>      

       

      </Routes>


      <Footer/>
      
    </div>
  );
}

export default Main;
