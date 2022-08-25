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
import ToggleThemecontext from './Context/ThemeContext';
import { store } from './redux/Store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack'


function App() {
  return (
    <>
     <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <ToggleThemecontext>
        <Header />

        <Switch>

          <Route path={"/"} exact component={Home} />
          <Route path={"/departments"} exact component={Departments} />
          <Route path={"/doctors"} exact component={Doctors} />
          <Route path={"/about"} exact component={About} />
          <Route path={"/contact"} exact component={Contact} />
          <Route path={"/login_signup"} exact component={Login_signup} />
          <Route path={"/Medicines"} exact component={Medicine} />
          <Route path={"/refexample"} exact component={Refexample} />
          <Route path={"/appointment"} exact component={Appointment} />
          <Route path={"/BookAppointment"} exact component={BookAppointment} />
          <Route path={"/ListAppointment"} exact component={ListAppointment} />

        </Switch>

        <Footer />
      </ToggleThemecontext>
    </Provider>
    </SnackbarProvider>
    </>
  );
}

export default App;
