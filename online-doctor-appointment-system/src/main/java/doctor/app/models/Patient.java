package doctor.app.models;

import java.util.Date;
import java.util.Map;

/**
 * Model for patient.
 */

public class Patient extends User {	

	private boolean verified;
	private Date appointment;
	public Patient() {
		super();
	}

	/**
	 * Patient model constructor
	 * @param firstName
	 * @param lastName
	 * @param address
	 * @param phoneNumber
	 * @param email
	 * @param verified
	 */
	public Patient(String firstName, String lastName, Map<String, String> address, String phoneNumber, String email, 
			boolean verified) {
		super();
		this.verified = verified;
	}

	public boolean isVerified() {
		return verified;
	}

	public Date getAppointment() {
		return appointment;
	}

	public void setAppointment(Date appointment) {
		this.appointment = appointment;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}
	
}