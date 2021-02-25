import React, { Component } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import UserService from "../service/UserService";
//This is for the edit or cancel buttons on the current appointments
class UpcomingAppointmentsCard extends Component {
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
  deleteAppointment = (e, id) => {
    UserService.deleteAppointment(id);
  };
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

        if (currentAppointments.active === true) {
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
                        </span>
                      </span>
                    </div>
                  </Popup>
                </td>
                <td>
                  <form>
                    <Link to={"/appointment/edit/" + currentAppointments.id}>
                      <button className="btn btn-success">
                        <span>Edit</span>
                      </button>
                    </Link>

                    <input
                      type="submit"
                      value="Cancel"
                      className="btn btn-danger"
                      onClick={(e) => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?" +
                              `${currentAppointments.id}`
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
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient name</th>
              <th>Edit / Cancel appointment</th>
            </tr>
          </thead>

          <tbody>{this.currentAppointmentList()}</tbody>
        </table>
      </>
    );
  }
}

export default UpcomingAppointmentsCard;
