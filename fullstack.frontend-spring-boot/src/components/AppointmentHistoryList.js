import React, { Component } from "react";
import { CSVLink } from "react-csv";
import format from "date-fns/format";
import subMonths from "date-fns/subMonths";
class AppointmentHistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempArray: [],
      lastThirtyDays: format(subMonths(new Date(), 1), "yyyy-MM-dd")
    };
  }

  // The list that get rendered in the appointment history
  appointmentHistoryList = () => {
    let { appointmentHistory } = this.props;
    return appointmentHistory.map((history, i) => {
      return (
        <React.Fragment key={i}>
          <p>
            Patient name:
            {" " +
              history.patientInformation.patientFirstName +
              " " +
              history.patientInformation.patientLastName}{" "}
          </p>

          <p>
            bookingdate: {history.bookingDate} - bookingtime:{" "}
            {history.bookingStartTime} - Treated ailment:{" "}
            {history.treatedAilment}
          </p>
          <p>Doctor feedback: {history.doctorFeedback}</p>
          <p>Patient feedback: {history.patientFeedback}</p>
          <hr className="solid-divider" />
        </React.Fragment>
      );
    });
  };
  render() {
    let { tempArray } = this.state;
    // The headers for the CSV file
    tempArray = [
      [
        "Patient firstName",
        "Patient lastName",
        "Date",
        "Time",
        "Treated ailment",
        "Phone",
        "Email",
        "Doctor journal",
        "Patient feedback"
      ]
    ];

    // The data for the CSV file
    // Loops through and array and checks if the date is within the last 30 days.
    // If true it pushes that data in to a new array
    this.props.appointmentHistory.forEach((array) => {
      if (array.bookingDate > this.state.lastThirtyDays) {
        tempArray.push([
          array.patientInformation.patientFirstName,
          array.patientInformation.patientLastName,
          array.bookingDate,
          array.bookingStartTime,
          array.treatedAilment,
          array.patientInformation.patientPhone,
          array.patientInformation.patientEmail,
          array.doctorFeedback,
          array.patientFeedback
        ]);
      }
    });

    return (
      <>
        <div>{this.appointmentHistoryList()}</div>
        <CSVLink data={tempArray}>Download Montly Summary</CSVLink>
      </>
    );
  }
}

export default AppointmentHistoryList;
