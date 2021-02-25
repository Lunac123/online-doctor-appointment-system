import React, { Component } from "react";

class SearchDoctorResult extends Component {
  render() {
    let { finalDoctorList } = this.props;

    return (
      <>
        <h3>Doctor list</h3>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone number</th>
              <th scope="col">City</th>
              <th scope="col">Book appointment</th>
            </tr>
          </thead>
          <tbody>
            {finalDoctorList.map((list, key) => {
              return (
                <tr key={key}>
                  <td>{list.firstName}</td>
                  <td>{list.lastName}</td>
                  <td>{list.phoneNumber}</td>
                  <td>{list.address.city}</td>
                  <td>
                    <input
                      type="submit"
                      value="Book doctor"
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        this.props.searchDoctorResultSubmit(list.id)
                      }
                      // doctor ID should be fired here so the backend can get the values for the calendar
                      //onSubmit=
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default SearchDoctorResult;
