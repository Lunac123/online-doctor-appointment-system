import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import AuthService from "./service/AuthService";
import LoginComponent from "./pages/LoginPage";
import RegisterComponent from "./pages/RegisterPage";
import HomeDoctor from "./pages/HomeDoctorPage";
import HomePatient from "./pages/HomePatientPage";
import AppointmentHistory from "./pages/AppointmentHistoryPage";
import EditUserComponent from "./pages/EditUserPage";
import CreateAppointment from "./pages/CreateAppointmentPage";
import AppointmentComponent from "./pages/AppointmentPage";
import MenuComponent from "./components/MenuComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showDoctorBoard: false,
      showPatientBoard: false,
      currentUser: undefined,
      appointments: []
    };
  }

  componentDidMount() {
    // imports the userinformation based on the logged in user.
    const user = AuthService.getCurrentUser();

    if (user) {
      // Show information based on the role of the logged in user and sets
      // it in a variable to show relevant information depending on the logged in user
      this.setState({
        currentUser: user,
        showPatientBoard: user.roles.includes("ROLE_PATIENT"),
        //showPatientBoard: user.roles.includes("ROLE_DOCTOR", "ROLE_PATIENT"), // Only for dev purposes
        showDoctorBoard: user.roles.includes("ROLE_DOCTOR")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showPatientBoard, showDoctorBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-dark">
          <div className="header">
            <div className="logo"></div>
          </div>

          <div className="navbar-nav mr-auto">
            {showPatientBoard && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/createappointment"} className="nav-link">
                    Create appointments
                  </Link>
                </li>
              </div>
            )}
            {/* Shows the appropriate links depending on who is logged in (doctor or patient) */}
            {showDoctorBoard && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/doctor"} className="nav-link">
                    Appointment History
                  </Link>
                </li>
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <MenuComponent />
        <div className="container-xl container-md">
          <Switch>
            {showDoctorBoard && (
              <Route exact path={["/", "/home"]} component={HomeDoctor} />
            )}
            {showPatientBoard && (
              <Route exact path={["/", "/home"]} component={HomePatient} />
            )}
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            <Route path="/profile" component={EditUserComponent} />
            <Route path="/createappointment" component={CreateAppointment} />
            <Route path="/doctor" component={AppointmentHistory} />

            <Route
              exact
              path="/appointment/:id"
              render={(props) => <AppointmentComponent {...props} />}
            />
            <Route
              exact
              path="/appointment/:journal/:id"
              render={(props) => <AppointmentComponent {...props} />}
            />

            {/*<Route path="/appointment" component={AppointmentComponent} />*/}
          </Switch>
        </div>
        <div className="padding"></div>
        <div className="footer">
          <div className="footer-content"></div>
          <div className="footer-bottom">
            &copy; Docktor Booking system | Made and Designed by Team BDSM...
            aka Team 1
          </div>
        </div>
      </div>
    );
  }
}

export default App;
