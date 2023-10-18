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
import About from './Components/About';
import Terms from './Components/Terms';


function App() {
  return (
    <div className='bg-light d-flex flex-column min-vh-100 '>
      <HashRouter>
        <Navbar />
          <Routes>


          <Route path='/' element={<Home />} />
          <Route path="/admin/signin" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/unsubscribe" element={<Unsubscribe/>} />
          <Route path="/about" element={<About/>} />
        
          <Route path="/terms-and-conditions" element={<Terms/>} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoutes>
                <AdminDashboard />
              </AdminRoutes>
            }
          />
          <Route
            path="/user/detail"
            element={
              <AdminRoutes>
                <UserCard />
              </AdminRoutes>
            }
          />
          <Route
            path="/contacts/all"
            element={
              <AdminRoutes>
                <GetContacts />
              </AdminRoutes>
            }
          />


          <Route
            path="/contact/user/detail"
            element={
              <AdminRoutes>
                <ContactDetailCard />
              </AdminRoutes>
            }
          />

        </Routes>
      


        

      </HashRouter>


    </div>
    
  );
}

export default App;
