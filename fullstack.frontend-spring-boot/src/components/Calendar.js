import React, { useState } from "react";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import axios from "axios";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { addDays, getDay, setHours, isSameDay, parseISO } from "date-fns";
// import { parseJSON, parse } from "date-fns";
import eng from "date-fns/locale/en-GB";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calendar(props) {
  const [startDate, setStartDate] = useState(null);
  const [messageActive, setMessageActive] = useState(false);
  const [enterTime, setEnterTime] = useState(false);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  registerLocale("en", eng);
  setDefaultLocale("en", eng);

  function onFormSubmit(e) {
    e.preventDefault();
    // Checks if the user forgot to pick a time. Shows an error message if they forgot
    if (format(startDate, "HH:mm") === format(startDate, "00:00")) {
      setEnterTime(true);
    } else {
      setEnterTime(false);

      // Constant with all of the information that is gonna get put in to the database.
      const newAppointment = {
        bookingStartTime: format(startDate, "HH:mm"),
        //      bookingEndTime: this.state.bookingEndTime,
        bookingDate: format(startDate, "yyyy-MM-dd"),
        doctorInformation: {
          doctorId: props.chosenDoctor.id,
          doctorFirstName: props.chosenDoctor.firstName,
          doctorLastName: props.chosenDoctor.lastName,
          doctorPhone: props.chosenDoctor.phoneNumber,
          doctorEmail: props.chosenDoctor.email
        },
        patientInformation: {
          patientId: props.patientId,
          patientFirstName: props.patientFirstName,
          patientLastName: props.patientLastName,
          patientPhone: props.patientPhone,
          patientEmail: props.patientEmail
        },
        active: props.active,
        feedbackHistory: props.feedbackHistory,
        journalHistory: props.journalHistory,
        treatedAilment: props.ailmentsDropDownValue
      };
      axios
        .post("http://localhost:3000/api/appointment/create/", newAppointment)
        .then((res) => {
          setMessageActive(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Functions to exclude the time slots that the doctor already has an appointment
  let results = props.allAppointmentsWithDoctorId.map(
    (date) => new Date(parseISO(date))
  );

  const getExcludeTimesForDate = (date) =>
    results.filter((time) => isSameDay(date, time));

  const [excludeTimes, setExcludeTimes] = useState(
    getExcludeTimesForDate(startDate)
  );

  return (
    <>
      <h3>Available appointments</h3>
      <form
        className="datepicker"
        name="appointmentSelect"
        onSubmit={onFormSubmit}
      >
        <DatePicker
          className="form-control"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setExcludeTimes(getExcludeTimesForDate(date));
          }}
          inline
          disabledKeyboardNavigation
          showWeekNumbers
          timeCaption="Available"
          showTimeSelect
          dateFormat="yyyy-MM-dd"
          timeFormat="HH:mm"
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          filterDate={isWeekday}
          minTime={setHours(new Date(), 8)}
          maxTime={setHours(new Date(), 16)}
          timeIntervals={60}
          filterTime={filterPassedTime}
          excludeTimes={excludeTimes}
        />
        <input
          type="submit"
          className={`btn btn-success ${
            startDate && messageActive === false ? "showButton" : "hideCss"
          }`}
          // className="btn btn-success"
          value="Book appointment"
        />
      </form>
      <div className={`failure-message ${enterTime ? "showCss" : "hideCss"}`}>
        <span>Please select a time</span>
      </div>
      <div
        className={`success-message ${
          messageActive && enterTime === false ? "showCss" : "hideCss"
        }`}
      >
        <span> Your appointment request has been successfully sent</span>
      </div>
    </>
  );
}
