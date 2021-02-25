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
      temp: false
    };
  }
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
                  {currentAppointments.doctorInformation.doctorFirstName}{" "}
                  {currentAppointments.doctorInformation.doctorLastName}
                </td>
                <td>
                  <form>
                    {/* Shows information if you hover your mouse over the name on the webpage */}

                    <Popup
                      trigger={(open) => (
                        <span className="button btn btn-success">
                          Booking info
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
                              <strong>Date: </strong>
                              {" " + currentAppointments.bookingDate}
                            </p>
                            <p>
                              <strong>Time: </strong>{" "}
                              {currentAppointments.bookingStartTime}
                            </p>
                            <p>
                              <strong>Doctor name:</strong>{" "}
                              {currentAppointments.doctorInformation
                                .doctorFirstName +
                                " " +
                                currentAppointments.doctorInformation
                                  .doctorLastName}
                            </p>{" "}
                            <p>
                              <strong>
                                Email:{" "}
                                {
                                  currentAppointments.doctorInformation
                                    .doctorEmail
                                }
                              </strong>
                            </p>
                            <p>
                              <strong>
                                Phone:{" "}
                                {
                                  currentAppointments.doctorInformation
                                    .doctorPhone
                                }
                              </strong>
                            </p>
                            <p>
                              <strong>
                                Ailment: {currentAppointments.treatedAilment}
                              </strong>
                            </p>
                          </span>
                        </span>
                      </div>
                    </Popup>

                    <input
                      type="submit"
                      value="Cancel"
                      className="btn btn-danger"
                      onClick={(e) => {
                        if (
                          window.confirm(
                            "Are you sure you wish to cancel your appointment?"
                          )
                        )
                          this.deleteAppointment(e, currentAppointments.id);
                      }}
                    />
                  </form>
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
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor name</th>
            <th>Approve / Deny appointment</th>
          </tr>
        </thead>

        <tbody>{this.bookingRequestList()}</tbody>
      </table>
    );
  }
}

export default BookingRequests;
