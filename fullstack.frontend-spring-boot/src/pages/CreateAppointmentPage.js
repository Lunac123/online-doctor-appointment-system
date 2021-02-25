import React, { Component } from "react";
import UserService from "../service/UserService";
import SearchForm from "../components/SearchForm";
import SearchDoctorResult from "../components/SearchDoctorResultComponent";
import Calendar from "../components/Calendar";
export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorLocationlist: [],
      ailmentList: [],
      bookingStartTime: "",
      bookingEndTime: "",
      bookingDate: "",
      doctorId: "",
      patientId: "",
      patientFirstName: "",
      patientLastName: "",
      doctorFirstName: "",
      doctorLastName: "",
      active: false,
      feedbackHistory: false,
      journalHistory: false,
      dropDownLocation: "",
      ailmentsDropDownValue: "",
      locationDropDownValue: "",
      finalDoctorList: "",
      showAilmentList: false,
      chosenDoctor: "",
      chosenDoctorId: "",
      allAppointmentsWithDoctorId: [],
      patientPhone: "",
      patientEmail: ""
    };
  }
  componentDidMount() {
    this.loadUser();
    this.getDoctorLocations();
  }

  loadUser = () => {
    UserService.getLoggedInPatientInfo().then((response) => {
      this.setState({
        patientId: response.data.id,
        patientFirstName: response.data.firstName,
        patientLastName: response.data.lastName,
        patientPhone: response.data.phoneNumber,
        patientEmail: response.data.email
      });
    });
  };
  getAllAppointmentsWithDoctorId = async (id) => {
    let appointments = await UserService.getAppointmentsFromDoctorId(id);

    for (let index = 0; index < appointments.data.length; index++) {
      this.setState({
        allAppointmentsWithDoctorId: [
          ...this.state.allAppointmentsWithDoctorId,
          appointments.data[index].bookingDate +
            "T" +
            appointments.data[index].bookingStartTime
        ]
      });
    }
  };

  searchDoctorResultSubmit = async (id) => {
    UserService.getDoctorInfoById(id).then((res) => {
      const chosenDoctor = res.data;
      this.getAllAppointmentsWithDoctorId(chosenDoctor.id).then((res2) => {});
      this.setState({
        chosenDoctor: res.data
      });
    });
  };

  getDoctorLocations = () => {
    UserService.getDoctorLocations().then((res) => {
      this.setState({
        doctorLocationlist: res.data
      });
    });
  };
  getAilments = (res) => {
    UserService.getAilmentListByDoctorLocation(res).then((response) => {
      this.setState({
        ailmentList: response.data
      });
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
  };
  onSearchSubmit = (e) => {
    let { locationDropDownValue, ailmentsDropDownValue } = this.state;
    e.preventDefault();

    UserService.getDoctorByLocationAndAilment(
      locationDropDownValue,
      ailmentsDropDownValue
    ).then((response) => {
      this.setState({
        finalDoctorList: response.data
      });
    });
  };

  onChangeBookingTime = (e) => {
    this.setState({
      bookingStartTime: e.target.value
    });
  };

  onChangeBookingDate = (e) => {
    this.setState({
      bookingDate: e.target.value
    });
  };
  onChangeLocation = (e) => {
    this.setState({
      locationDropDownValue: e.target.value,
      showAilmentList: true
    });
    this.getAilments(e.target.value);
  };

  onChangeAilments = (e) => {
    this.setState({
      ailmentsDropDownValue: e.target.value
    });
  };

  // Create "alert" for user if something went wrong

  render() {
    let {
      doctorLocationlist,
      ailmentList,
      bookingDate,
      bookingStartTime,
      bookingEndTime,
      dropDownLocation,
      finalDoctorList,
      showAilmentList,
      allAppointmentsWithDoctorId,
      chosenDoctor
    } = this.state;
    // Removes null values (filter) and duplicates from the location list (the cities)
    let result2 = doctorLocationlist.map((result) => result.address.city);
    const finalDoctorLocationList = [
      ...new Map(
        result2
          .filter((x) => x != null)
          .map((item) => [JSON.stringify(item), item])
      ).values()
    ];

    // Remove duplicates from the ailmentList to print in the dropdown menu on the page
    // Then it flattens the array so all items gets put in to one array list.
    let result = ailmentList.map((result) => result.ailmentList);
    const flattedAilmentList = [
      ...new Map(
        result.flat().map((item) => [JSON.stringify(item), item])
      ).values()
    ];

    return (
      <div className="row">
        <div className="col-lg-12 col-sm-12">
          <div className="card">
            {/* Sends props in to the Searchform */}
            <SearchForm
              onChangeAilments={this.onChangeAilments}
              onSearchSubmit={this.onSearchSubmit}
              onChangeLocation={this.onChangeLocation}
              bookingStartTime={bookingStartTime}
              bookingEndTime={bookingEndTime}
              bookingDate={bookingDate}
              finalDoctorLocationList={finalDoctorLocationList}
              flattedAilmentList={flattedAilmentList}
              dropDownLocation={dropDownLocation}
              showAilmentList={showAilmentList}
            />
            {/* Checks if the final doctor list is empty or not */}
            {/* If it is not empty it shows the SearchDoctorResult component */}
            {!!finalDoctorList ? (
              <SearchDoctorResult
                searchDoctorResultSubmit={this.searchDoctorResultSubmit}
                finalDoctorList={finalDoctorList}
              />
            ) : null}
            {!!chosenDoctor ? (
              <Calendar
                // bookingStartTime={bookingStartTime}
                // bookingEndTime={bookingEndTime}
                // onChangeBookingDate={this.onChangeBookingDate}
                // onChangeBookingTime={this.onChangeBookingTime}
                chosenDoctor={this.state.chosenDoctor}
                patientId={this.state.patientId}
                patientFirstName={this.state.patientFirstName}
                patientLastName={this.state.patientLastName}
                active={this.state.active}
                feedbackHistory={this.state.feedbackHistory}
                journalHistory={this.state.journalHistory}
                ailmentsDropDownValue={this.state.ailmentsDropDownValue}
                allAppointmentsWithDoctorId={allAppointmentsWithDoctorId}
                patientPhone={this.state.patientPhone}
                patientEmail={this.state.patientEmail}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
