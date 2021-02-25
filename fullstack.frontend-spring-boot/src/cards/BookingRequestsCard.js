import React, { Component } from "react";
import Popup from "reactjs-popup";
import UserService from "../service/UserService";

class BookingRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientId: "",
      patientInformation: "",
      currentDate: this.props.currentDate,
      appointments: this.props.appointments,
      feedback: "Test",
      name: "Doctor",
      email: "msten75@gmail.com",
      reload: false,
      subject: "",
      patientName: "",
      date: "",
      time: "",
      doctorName: "",
      phone: "555-555-5555"
    };
  }

  // Handles the "deny appointment".
  handleDeny = (appointmentInformation) => {
    // Template id for the email service template
    const templateId = "template_jaqy5ui";

    // Patient full name in to one constant
    const patientName =
      appointmentInformation.patientInformation.patientFirstName +
      " " +
      appointmentInformation.patientInformation.patientLastName;

    // Fires a second function to actually send an email and update the database.
    this.sendFeedbackDeniedVersion(
      templateId,
      {
        from_name: this.state.name,
        reply_to: appointmentInformation.patientInformation.patientEmail,
        from_email: appointmentInformation.patientInformation.patientEmail,
        patientName: patientName,
        phone: this.state.phone
      },
      appointmentInformation
    );
  };

  // Emails the user when the deny button has been pushed. Also deletes the appointment from the database
  sendFeedbackDeniedVersion = (
    templateId,
    variables,
    appointmentInformation
  ) => {
    window.emailjs
      .send("service_q8gzh52", templateId, variables)
      .then((res) => {
        UserService.deleteAppointment(appointmentInformation.id).then(() =>
          window.location.reload()
        );
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  };

  handleSubmit = (appointmentInformation) => {
    // Template id for the email service template
    const templateId = "template_dxz5cj6";

    // Patient full name in to one constant
    const patientName =
      appointmentInformation.patientInformation.patientFirstName +
      " " +
      appointmentInformation.patientInformation.patientLastName;

    // Time, date and doctorname from the appointment
    const time = appointmentInformation.bookingStartTime;
    const date = appointmentInformation.bookingDate;
    const doctorName =
      appointmentInformation.doctorInformation.doctorFirstName +
      " " +
      appointmentInformation.doctorInformation.doctorLastName;

    // Fires a second function to actually send an email and update the database.
    this.sendFeedback(
      templateId,
      {
        from_name: this.state.name,
        reply_to: appointmentInformation.patientInformation.patientEmail,
        from_email: appointmentInformation.patientInformation.patientEmail,
        patientName: patientName,
        time: time,
        date: date,
        doctorName: doctorName,
        phone: this.state.phone
      },
      appointmentInformation
    );
  };

  sendFeedback = (templateId, variables, appointmentInformation) => {
    // Emails the user when the deny button has been pushed. Also deletes the appointment from the database
    window.emailjs
      .send("service_q8gzh52", templateId, variables)
      .then((res) => {
        let feedback = {
          feedbackHistory: false,
          journalHistory: false,
          active: true,
          bookingDate: appointmentInformation.bookingDate,
          bookingStartTime: appointmentInformation.bookingStartTime,
          treatedAilment: appointmentInformation.treatedAilment
        };

        UserService.editAppointment(
          appointmentInformation.id,
          feedback
        ).then(() => window.location.reload());
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  };

  deleteAppointment = (e, id) => {
    UserService.deleteAppointment(id);
  };

  bookingRequestList = () => {
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

        if (currentAppointments.active === false) {
          // Checks the booking date against current date(todays date). Old dates don't get shown
          if (currentAppointments.bookingDate >= currentDate) {
            return (
              <tr key={i}>
                <td>{currentAppointments.bookingDate}</td>
                <td>{currentAppointments.bookingStartTime}</td>
                <td>
                  {/* Shows information if you hover your mouse over the name on the webpage */}
                  <Popup
                    trigger={(open) => (
                      <span className="button">
                        {" "}
                        {
                          currentAppointments.patientInformation
                            .patientFirstName
                        }{" "}
                        {currentAppointments.patientInformation.patientLastName}
                      </span>
                    )}
                    position="top left"
                    on={["hover", "focus"]}
                    closeOnDocumentClick
                  >
                    <div className="tooltipBoundary">
                      <span>
                        {" "}
                        <span>
                          <p>
                            <strong>Patient name:</strong>
                            {" " +
                              currentAppointments.patientInformation
                                .patientFirstName}{" "}
                            {
                              currentAppointments.patientInformation
                                .patientLastName
                            }
                          </p>
                          <p>
                            <strong>Patient phone:</strong>{" "}
                            {
                              currentAppointments.patientInformation
                                .patientPhone
                            }
                          </p>
                          <p>
                            <strong>Patient email:</strong>{" "}
                            {
                              currentAppointments.patientInformation
                                .patientEmail
                            }
                          </p>{" "}
                          <p>
                            <strong>Patient Ailment:</strong>{" "}
                            {currentAppointments.treatedAilment}
                          </p>{" "}
                        </span>
                      </span>
                    </div>
                  </Popup>
                </td>
                <td>
                  <input
                    type="submit"
                    value="Approve"
                    className="btn btn-success"
                    onClick={() => this.handleSubmit(currentAppointments)}
                  />

                  <input
                    type="submit"
                    value="Deny"
                    className="btn btn-danger"
                    onClick={(e) => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this appointment?"
                        )
                      )
                        this.handleDeny(currentAppointments);
                    }}
                  />
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
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient name</th>
              <th>Approve / Deny appointment</th>
            </tr>
          </thead>

          <tbody>{this.bookingRequestList()}</tbody>
        </table>
      </>
    );
  }
}

export default BookingRequests;
