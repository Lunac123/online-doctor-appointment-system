import React, { Component } from "react";
import { Link } from "react-router-dom";

//this is the Finished appointments on home for the doctor with the links that lead to AppointmentForm.js
class FinishedAppointmentsPatientCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: "",
      patientInformation: "",
      currentDate: this.props.currentDate,
      posts: [],
      appointments: this.props.appointments,
      test: []
    };
  }

  currentAppointmentList = () => {
    let { appointments } = this.props;
    let { currentDate } = this.state;

    // Sorts the array by date
    return appointments
      .sort(function compare(a, b) {
        let dateA = new Date(a.bookingDate);
        let dateB = new Date(b.bookingDate);
        return dateA - dateB;
      })
      .map((currentAppointments, i) => {
        // Renders the appointment list based on the active boolean
        // Active = current active appointments
        // else is not yet confirmed booking requests

        if (
          currentAppointments.active === true &&
          currentAppointments.feedbackHistory === false
        ) {
          if (currentAppointments.bookingDate < currentDate) {
            return (
              <tr key={i}>
                <td>{currentAppointments.bookingDate}</td>
                <td>{currentAppointments.bookingStartTime}</td>
                <td>
                  {currentAppointments.doctorInformation.doctorFirstName}{" "}
                  {currentAppointments.doctorInformation.doctorLastName}
                </td>
                <td>
                  <Link to={"/appointment/feedback/" + currentAppointments.id}>
                    <button className="btn btn-success">
                      <span>Write Feedback</span>
                    </button>
                  </Link>
                </td>
              </tr>
            );
          } else {
            return null;
          }
        } else {
          return null;
        }
      });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor name</th>
              <th>Journal</th>
            </tr>
          </thead>

          <tbody>{this.currentAppointmentList()}</tbody>
        </table>
      </div>
    );
  }
}
export default FinishedAppointmentsPatientCard;
