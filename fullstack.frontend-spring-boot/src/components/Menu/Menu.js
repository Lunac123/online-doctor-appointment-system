import React from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";

import AuthService from "../../service/AuthService";

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  let showDoctorBoard = false;
  let showPatientBoard = false;
  let currentUser = undefined;

  const user = AuthService.getCurrentUser();
  currentUser = user;

  function logOut() {
    AuthService.logout();
  }
  if (user) {
    if (user.roles.includes("ROLE_DOCTOR")) {
      showDoctorBoard = true;
    } else if (user.roles.includes("ROLE_PATIENT")) {
      showPatientBoard = true;
    }
  }

  return (
    <StyledMenu
      className="side-links"
      open={open}
      aria-hidden={!isHidden}
      {...props}
    >
      {currentUser ? (
        <>
          <a href="/home" tabIndex={tabIndex}>
            <span aria-hidden="true">🏠</span>
            Home
          </a>{" "}
          <a href="/profile" tabIndex={tabIndex}>
            <span aria-hidden="true">📓</span>
            Profile
          </a>
          <a href="/login" tabIndex={tabIndex} onClick={logOut}>
            <span aria-hidden="true">🚪</span>
            Logout
          </a>
        </>
      ) : (
        <>
          <a href="/login" tabIndex={tabIndex}>
            <span aria-hidden="true">🔑</span>
            Login
          </a>
          <a href="/register" tabIndex={tabIndex}>
            <span aria-hidden="true">🔐</span>
            Sign Up
          </a>{" "}
        </>
      )}

      {showPatientBoard && (
        <a href="/createappointment" tabIndex={tabIndex}>
          <span aria-hidden="true">🗓️</span>
          Create appointment
        </a>
      )}
      {showDoctorBoard && (
        <a href="/doctor" tabIndex={tabIndex}>
          <span aria-hidden="true">📝</span>
          Appointment history
        </a>
      )}
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired
};

export default Menu;
