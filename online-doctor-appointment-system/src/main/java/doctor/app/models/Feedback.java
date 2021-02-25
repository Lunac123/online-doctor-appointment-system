package doctor.app.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model for feedback.
 */

@Document
public class Feedback {

	@Id
	private String Id;
	private String doctorId;
	private String patientId;
	private String appointmentId;
	private String feedbackMessage;
	
	public Feedback() {
		
	}
	
	/**
	 * Feedback model constructor
	 * @param doctorId
	 * @param patientId
	 * @param appointmentId
	 * @param feedbackMessage
	 */
	public Feedback(String doctorId, String patientId, String appointmentId, String feedbackMessage) {
		super();
		this.doctorId = doctorId;
		this.patientId = patientId;
		this.appointmentId = appointmentId;
		this.feedbackMessage = feedbackMessage;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(String appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getFeedbackMessage() {
		return feedbackMessage;
	}

	public void setFeedbackMessage(String feedbackMessage) {
		this.feedbackMessage = feedbackMessage;
	}
}
