import axios from "axios";
import authHeader from "./AuthHeader";
import authService from "./AuthService";

const API_URL = "http://localhost:3000/api/";

// All the calls to the backend.
class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getPatientBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getDoctorBoard() {
    return axios.get(API_URL + "doctor", { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  // fetches all appointments from the end point
  getAppointments() {
    return axios.get(API_URL + "appointment/", { headers: authHeader() });
  }

  // fetches all appointments with a specific patient id
  getAppointmentsFromId(id) {
    return axios.get(API_URL + "appointment/findbyid/" + id, {
      headers: authHeader()
    });
  }
  // fetches all appointments with a specific patient id
  getAppointmentsFromPatientId(patientId) {
    return axios.get(API_URL + "appointment/patient/" + patientId, {
      headers: authHeader()
    });
  }
  // fetches all appointments with a specific doctor id
  getAppointmentsFromDoctorId(doctorId) {
    return axios.get(API_URL + "appointment/doctor/" + doctorId, {
      headers: authHeader()
    });
  }
  // fetches all appointment history from the end point
  getDoctorAppointmentHistory(doctorId, journalHistory) {
    return axios.get(
      API_URL +
        "appointment/appointmenthistory/doctor/" +
        doctorId +
        "/" +
        journalHistory,
      {
        headers: authHeader()
      }
    );
  }

  async deleteAppointment(id) {
    return await axios
      .delete(API_URL + "appointment/deleteappointment/" + id, {
        headers: authHeader()
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  updateAppointmentFeedbackBoolean(id, data) {
    return axios.put(
      API_URL + "appointment/updateappointment/feedbackhistory/" + id,
      data,
      {
        headers: authHeader()
      }
    );
  }

  updateAppointmentJournalBoolean(id, data) {
    return axios.put(
      API_URL + "appointment/updateappointment/journalhistory/" + id,
      data,
      {
        headers: authHeader()
      }
    );
  }

  editAppointment(id, data) {
    return axios.put(API_URL + "appointment/updateappointment/" + id, data, {
      headers: authHeader()
    });
  }

  getPatientName(patientId) {
    return axios.get(API_URL + "patient/findpatient/" + patientId, {
      headers: authHeader()
    });
  }

  async getPatientNameTest(patientId) {
    const result = await axios.get(
      API_URL + "patient/findpatient/" + patientId,
      {
        headers: authHeader()
      }
    );
    const data = {
      firstName: result.data.firstName,
      lastName: result.data.lastName
    };
    return data;
  }
  // fetches all database information for a specific patient
  getLoggedInPatientInfo() {
    let userId = authService.getCurrentUserId();
    return axios.get(API_URL + "patient/findpatient/" + userId, {
      headers: authHeader()
    });
  }
  // fetches all database information for a specific doctor
  getDoctorInfo() {
    let userId = authService.getCurrentUserId();
    return axios.get(API_URL + "doctor/finddoctor/" + userId, {
      headers: authHeader()
    });
  }

  getDoctorInfoById(id) {
    return axios.get(API_URL + "doctor/finddoctor/" + id, {
      headers: authHeader()
    });
  }
  // fetches all locations for all the doctors in the datbase
  // this is used to render the drop down menu in the search function for the booking requests.
  getDoctorLocations() {
    // This is the id for the ROLE_DOCTOR in the database
    let role = "5ff86007480a2c4b6d697909";
    return axios.get(API_URL + "doctor/doctorlocations/" + role, {
      headers: authHeader()
    });
  }

  // fetches all ailments from the end point
  // this is used to render the drop down menu in the search function for the booking requests.
  getAilmentList() {
    return axios.get(API_URL + "doctor/doctorailment/", {
      headers: authHeader()
    });
  }

  getDoctorByLocationAndAilment(location, ailment) {
    return axios.get(
      API_URL + "doctor/findbyailmentandlocation/" + location + "/" + ailment,
      {
        headers: authHeader()
      }
    );
  }
  getAilmentListByDoctorLocation(location) {
    let role = "5ff86007480a2c4b6d697909";
    return axios.get(
      API_URL + "doctor/findbylocation/" + location + "/" + role,
      {
        headers: authHeader()
      }
    );
  }
  // edits the current user information (works for both doctors and patients)
  editUser(user) {
    let userId = authService.getCurrentUserId();
    return axios.put(API_URL + "doctor/updatedoctor/" + userId, user, {
      headers: authHeader()
    });
  }
}
export default new UserService();
