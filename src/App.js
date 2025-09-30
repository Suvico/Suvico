import Navbar from './Components/Navbar'
import { Route, Routes, HashRouter } from "react-router-dom"
import Home from './Components/Home'
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Services from './Components/Services';
import ContactUs from './Components/ContactUs';
import Confirmation from './Components/Confirmation';
import AdminDashboard from './AdminComponents/AdminDashboard';
import AdminLogin from './AdminComponents/AdminLogin';
import AdminRoutes from './auth/AdminRoutes';
import UserCard from './AdminComponents/UserCard';
import GetContacts from './AdminComponents/GetContacts';
import ContactDetailCard from './AdminComponents/ContactDetailCard';
import Unsubscribe from './Components/Unsubscribe';
import Upisignup from './Components/Upisignup';
import About from './Components/About';
import Terms from './Components/Terms';
import MandateStatusChecker from "./Components/MandateStatusChecker";
import EMandateForm from './Components/EmandateForm';
import Panchang from './Components/AstroServices/Panchang';
import Dosha from './Components/AstroServices/Dosha';
import MatchMaking from './Components/AstroServices/MatchMaking';
import TodaysHoroscope from './Components/AstroServices/TodaysHoroscope';
import WeeklyHoroscope from './Components/AstroServices/WeeklyHoroscope';
import YearlyHoroscope from './Components/AstroServices/YearlyHoroscope';
import Numerology from './Components/AstroServices/Numerology';


function App() {
  return (
    <div className='bg-light d-flex flex-column min-vh-100 '>
      <HashRouter>
        <Navbar />
          <Routes>


          <Route path='/' element={<Home />} />
          {/* <Route path="/admin/signin" element={<AdminLogin />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/emandate" element={<EMandateForm />} />
          <Route path='/MandateStatusChecker' element={<MandateStatusChecker/>}/>
          <Route path="/Upisignup" element={<Upisignup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/unsubscribe" element={<Unsubscribe/>} />
          {/* <Route path="/panchang" element={<Panchang/>} />
          <Route path="/dosha" element={<Dosha/>} />
          <Route path="/numerology" element={<Numerology/>} />
          <Route path="/match-making" element={<MatchMaking/>} />
          <Route path="/todayshoroscope" element={<TodaysHoroscope/>} />
          <Route path="/weeklyhoroscope" element={<WeeklyHoroscope/>} />
          <Route path="/yearlyhoroscope" element={<YearlyHoroscope/>} /> */}
          <Route path="/about" element={<About/>} />
         
        
          <Route path="/terms-and-conditions" element={<Terms/>} />

        

        </Routes>
        <Footer/>
        
      
 

        

      </HashRouter>


    </div>
    
  );
}

export default App;
