import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Services from './Components/Services';
import ContactUs from './Components/ContactUs';
import Confirmation from './Components/Confirmation';
import Unsubscribe from './Components/Unsubscribe';
import Upisignup from './Components/Upisignup';
import About from './Components/About';
import Terms from './Components/Terms';
import MandateStatusChecker from './Components/MandateStatusChecker';
import EMandateForm from './Components/EmandateForm';
import NotFoundPage from "./Components/NotFoundPage";

// Astro Services (uncomment if needed)
import Panchang from './Components/AstroServices/Panchang';
import Dosha from './Components/AstroServices/Dosha';
import MatchMaking from './Components/AstroServices/MatchMaking';
import TodaysHoroscope from './Components/AstroServices/TodaysHoroscope';
import WeeklyHoroscope from './Components/AstroServices/WeeklyHoroscope';
import YearlyHoroscope from './Components/AstroServices/YearlyHoroscope';
import Numerology from './Components/AstroServices/Numerology';

// Admin Components (uncomment if needed)
// import AdminDashboard from './AdminComponents/AdminDashboard';
// import AdminLogin from './AdminComponents/AdminLogin';
// import AdminRoutes from './auth/AdminRoutes';
// import UserCard from './AdminComponents/UserCard';
// import GetContacts from './AdminComponents/GetContacts';
// import ContactDetailCard from './AdminComponents/ContactDetailCard';


function App() {
  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/emandate" element={<EMandateForm />} />
          {/* <Route path="/mandatestatuschecker" element={<MandateStatusChecker />} /> */}
          {/* <Route path="/upisignup" element={<Upisignup />} /> */}
          <Route path="/services" element={<Services />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms-and-conditions" element={<Terms />} />

                  {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />

          {/* Astro Services */}
          {/* <Route path="/panchang" element={<Panchang />} />
          <Route path="/dosha" element={<Dosha />} />
          <Route path="/numerology" element={<Numerology />} />
          <Route path="/match-making" element={<MatchMaking />} />
          <Route path="/todayshoroscope" element={<TodaysHoroscope />} />
          <Route path="/weeklyhoroscope" element={<WeeklyHoroscope />} />
          <Route path="/yearlyhoroscope" element={<YearlyHoroscope />} /> */}
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
