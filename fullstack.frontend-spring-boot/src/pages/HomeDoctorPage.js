import React, { Component } from "react";

import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
import CurrentAppointments from "../cards/CurrentAppointmentsCard";
import FinishedAppointments from "../cards/FinishedAppointmentsCard";
import BookingRequests from "../cards/BookingRequestsCard";
import format from "date-fns/format";
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: "",
      appointments: [],
      currentDate: format(new Date(), "yyyy-MM-dd"),
      patientName: "",
      reload: false
    };
  }
  refreshPage = () => {
    this.setState({ reload: true }, () => this.setState({ reload: false }));
  };

  // Gets an array of all appointsments in the database for the currently logged in doctor.
  getAllAppointments = async () => {
    const doctorId = AuthService.getCurrentUserId();

    // fetches all appointments from mongodb based on the logged in doctors ID
    await UserService.getAppointmentsFromDoctorId(doctorId).then(
      (response) => {
        this.setState({
          appointments: response.data
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  };

  componentDidMount() {
    this.getAllAppointments();
  }

  render() {
    let { appointments, currentDate } = this.state;

    return (
      <div className="row">
        <div className="col-lg-12 col-sm-12">
          <header className="jumbotron">
            <div className="logo2"></div>
          </header>

          <div className="card">
            <h2>Booking requests</h2>
            <BookingRequests
              appointments={appointments}
              currentDate={currentDate}
            />
          </div>
          <div className="card">
            <h2>Upcoming appointments</h2>
            <CurrentAppointments
              appointments={appointments}
              currentDate={currentDate}
            />
          </div>
          <div className="card">
            <h2>Finished appointments</h2>
            <FinishedAppointments
              appointments={appointments}
              currentDate={currentDate}
            />
          </div>
          {/* <div className="card">
            <h2>Email</h2>
          </div> */}
        </div>
      </div>
    );
  }
}
