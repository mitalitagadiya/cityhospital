import logo from './logo.svg';
import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Home from './Container/Home/Home';
import Departments from './Container/Departments/Departments';
import { Route, Switch } from 'react-router-dom';
import Doctors from './Container/Doctors/Doctors';
import About from './Container/About/About';
import Contact from './Container/Contact/Contact';
import Login_signup from './Container/Login_signup/Login_signup';
import Medicine from './Container/Medicine/Medicine';
import Refexample from './Container/Refexample/Refexample';
import Appointment from './Container/Appointment/BookAppointment';  
import BookAppointment from './Container/Appointment/BookAppointment';
import ListAppointment from './Container/Appointment/ListAppointment';
import PublicRoute from './Route/PublicRoute';
import PrivateRoute from './Route/PrivateRoute';
 

function App() {
  return (
    <>
      <Header />
      
      <Switch>

        <PublicRoute path={"/"} exact component={Home}/>
        <PublicRoute path={"/departments"} exact component={Departments}/>
        <PublicRoute path={"/doctors"} exact component={Doctors}/>
        <PublicRoute path={"/about"} exact component={About}/>
        <PublicRoute path={"/contact"} exact component={Contact}/>
        <PublicRoute path={"/login_signup"} restricted={true} exact component={Login_signup}/>
        <PublicRoute path={"/Medicines"} exact component={Medicine} />
        <PublicRoute path={"/refexample"} exact component={Refexample} />
        <PublicRoute path={"/appointment"} exact component={Appointment} />
        <PrivateRoute path={"/BookAppointment"} exact component={BookAppointment} />
        <PrivateRoute path={"/ListAppointment"} exact component={ListAppointment} />

      </Switch>

      <Footer />
    </>
  );
}

export default App;
