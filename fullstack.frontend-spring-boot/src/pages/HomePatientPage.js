import React, { Component } from "react";

import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
import FinishedAppointmentsPatientCard from "../cards/FinishedAppointmentsPatientCard";
import CurrentAppointmentsPatientCard from "../cards/CurrentAppointmentsPatientCard";
import BookingRequests from "../cards/BookingRequestsPatientCard";
import format from "date-fns/format";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      currentDate: format(new Date(), "yyyy-MM-dd")
    };
  }

  // Gets an array of all appointsments in the database for the currently logged in patient.
  getAllAppointments = () => {
    const patientId = AuthService.getCurrentUserId();
    UserService.getAppointmentsFromPatientId(patientId).then(
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
      <>
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <header className="jumbotron">
              <div className="logo4"></div>
            </header>

            <div className="card">
              <h2>Booking requests</h2>
              <BookingRequests
                //              approveBookingRequest={this.approveBookingRequest}
                appointments={appointments}
                currentDate={currentDate}
              />
            </div>
            <div className="card">
              <h2>Upcoming appointments</h2>
              <CurrentAppointmentsPatientCard
                appointments={appointments}
                currentDate={currentDate}
              />
            </div>
            <div className="card">
              <h2>Finished appointments</h2>
              <FinishedAppointmentsPatientCard
                appointments={appointments}
                currentDate={currentDate}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
