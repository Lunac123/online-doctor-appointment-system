import React from "react";
import UserService from "../../service/UserService";
//This is for the edit or cancel buttons on the current appointments

class GetPatientInfo {
  getPatientName(patientId) {
    UserService.getPatientName(patientId).then(
      (response) => {
        return response.data;
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
  }
}
export default GetPatientInfo;
