import React, { Component } from "react";
import UserService from "../service/UserService";

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userName: "",
      firstName: "",
      lastName: "",
      zipCode: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      showDiv: false
    };
    //        this.saveUser = this.saveUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    UserService.getDoctorInfo().then(
      (response) => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
          zipCode: response.data.address.zipCode,
          streetAddress: response.data.address.streetAddress,
          city: response.data.address.city
        });
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

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  saveUser = (e) => {
    e.preventDefault();
    let user = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      zipCode: this.state.zipCode,
      streetAddress: this.state.streetAddress,
      city: this.state.city
    };

    UserService.editUser(user)
      .then(() => {
        this.setState({ showDiv: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="card">
          <h2 className="text-center">Edit User</h2>

          <form>
            <div className="row">
              <div className="col">
                <label>First Name:</label>
                <input
                  placeholder="First Name"
                  name="firstName"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label>Last Name:</label>
                <input
                  placeholder="Last Name"
                  name="lastName"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Phone Number:</label>
                <input
                  placeholder="Phone Number"
                  name="phoneNumber"
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Street Address:</label>
                <input
                  placeholder="Street Address"
                  name="streetAddress"
                  className="form-control"
                  value={this.state.streetAddress}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Zip code</label>
                <input
                  placeholder="Zip Code"
                  name="zipCode"
                  className="form-control"
                  value={this.state.zipCode}
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label>City:</label>
                <input
                  placeholder="City"
                  name="city"
                  className="form-control"
                  value={this.state.city}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <button className="btn btn-success" onClick={this.saveUser}>
              Save
            </button>
          </form>
          <div
            className={`success-message ${
              this.state.showDiv === true ? "showButton" : "hideCss"
            }`}
          >
            <span>Saved Successfully</span>
          </div>
        </div>
      </>
    );
  }
}

export default EditUserComponent;
