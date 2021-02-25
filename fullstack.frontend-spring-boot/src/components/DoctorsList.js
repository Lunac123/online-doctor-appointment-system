import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Doctors = (props) => (
  <div>
    <div>
      {props.doctors.firstName} {props.doctors.lastName} {", Phone: "} {props.doctors.phoneNumber} {", City: "} {props.doctors.address.city} {" "}
      <Link to={"/edit-category/" + props.doctors._id}>Edit</Link>
    </div>
  </div>
);
const Appointments = (props) => (
  <div>
    <div>
      bookingdate: {props.appointments.bookingDate} - bookingtime: {props.appointments.bookingTime}
    </div>
  </div>
)
export default class CategoriesList extends Component {
  constructor(props) {
    super(props);
  this.state = { doctors: [], appointments: [] };
    
  } 

  componentDidMount = () => {
    axios.get("http://localhost:3000/doctor/").then((res) => {
      this.setState({
        doctors: res.data
      });
    });
    axios.get("http://localhost:3000/appointment/").then((res) => {
      this.setState({
        appointments: res.data
      });
    }); 

  };

  doctorsList = () => {
    return this.state.doctors.map((currentDoctors, i) => {
      return <Doctors doctors={currentDoctors} key={i} />;
    });
  };

  appointmentList = () => {
    return this.state.appointments.map((currentAppointments, i) => {
      return <Appointments appointments={currentAppointments} key={i} />;
    });
  };
  
  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      return (     
        <div>          
          <h1>Doctors</h1>
          {this.doctorsList()}
          <h2>Appointments</h2>
          {this.appointmentList()} 
  
        </div>
      );
  } else {
      return <Redirect to="/login" />
  }
}
}

