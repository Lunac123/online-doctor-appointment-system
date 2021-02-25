package doctor.app.models;

import javax.validation.constraints.NotEmpty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model for AppointmentHistory.
 */

@Document(collection = "appointmenthistory")
public class AppointmentHistory {

	@Id
	private String id;
	
	@NotEmpty
	private String patientId;
	@NotEmpty
	private String doctorId;
	@NotEmpty
	private String treatedAilment;
	@NotEmpty
	private String appointmentTime;
	@NotEmpty
	private String appointmentDate;
	@NotEmpty	
	private String doctorFeedback;
	private String patientFeedback;
	private Boolean status;
	
	public AppointmentHistory() {
		
	}
	
	/**
	 * Appointment history constructor
	 * @param patientId
	 * @param doctorId
	 * @param treatedAilment
	 * @param appointmentTime
	 * @param appointmentDate
	 * @param doctorFeedback
	 * @param patientFeedback
	 */
	public AppointmentHistory(String patientId, String doctorId, String treatedAilment, String appointmentTime,
			String appointmentDate, String doctorFeedback, String patientFeedback) {
		super();
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.treatedAilment = treatedAilment;
		this.appointmentTime = appointmentTime;
		this.appointmentDate = appointmentDate;
		this.doctorFeedback = doctorFeedback;
		this.patientFeedback = patientFeedback;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getTreatedAilment() {
		return treatedAilment;
	}

	public void setTreatedAilment(String treatedAilment) {
		this.treatedAilment = treatedAilment;
	}

	public String getAppointmentTime() {
		return appointmentTime;
	}

	public void setAppointmentTime(String appointmentTime) {
		this.appointmentTime = appointmentTime;
	}

	public String getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getDoctorFeedback() {
		return doctorFeedback;
	}

	public void setDoctorFeedback(String doctorFeedback) {
		this.doctorFeedback = doctorFeedback;
	}

	public String getPatientFeedback() {
		return patientFeedback;
	}

	public void setPatientFeedback(String patientFeedback) {
		this.patientFeedback = patientFeedback;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
}
