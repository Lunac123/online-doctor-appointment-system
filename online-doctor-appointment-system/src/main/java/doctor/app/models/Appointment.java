package doctor.app.models;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Model for appointment.
 */

@Document(collection = "appointment")
public class Appointment {

	@Id
	private String id;
	private Boolean active; //  set to false if the meeting is "done" or cancelled
	private String bookingDate; // String is a placeholder until joda-time or LocalDateTime is chosen to be used
	private String bookingStartTime;
	private String bookingEndTime;
	private String doctorFeedback;
	private String patientFeedback;
	private String treatedAilment;
	private Boolean feedbackHistory;
	private Boolean journalHistory;
	private String doctorExtraInformation;
	
	@Field("patientInformation")
	private Map<String, String> patientInformation = new HashMap<>();
	
	@Field("doctorInformation")
	private Map<String, String> doctorInformation = new HashMap<>();
	
	public Appointment() {
		
	}
		/**
		 * Appointment model constructor
		 * @param patientInformation
		 * @param doctorInformation
		 * @param active
		 * @param bookingDate
		 * @param bookingStartTime
		 * @param bookingEndTime
		 * @param doctorFeedback
		 * @param patientFeedback
		 * @param treatedAilment
		 */
	public Appointment(Map<String, String> patientInformation, Map<String, String> doctorInformation, Boolean active, String bookingDate, String bookingStartTime, String bookingEndTime, String doctorFeedback, String patientFeedback, String treatedAilment) {
		super();

		this.patientInformation = patientInformation;
		this.doctorInformation = doctorInformation;
		this.active = active;
		this.bookingDate = bookingDate;
		this.bookingStartTime = bookingStartTime;
		this.bookingEndTime = bookingEndTime;
		this.doctorFeedback = doctorFeedback;
		this.patientFeedback = patientFeedback;
		this.treatedAilment = treatedAilment;
	}
	
	public String getId() {
		return id;
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

	public String getTreatedAilment() {
		return treatedAilment;
	}

	public void setTreatedAilment(String treatedAilment) {
		this.treatedAilment = treatedAilment;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Boolean getFeedbackHistory() {
		return feedbackHistory;
	}

	public void setFeedbackHistory(Boolean feedbackHistory) {
		this.feedbackHistory = feedbackHistory;
	}

	public Boolean getJournalHistory() {
		return journalHistory;
	}

	public void setJournalHistory(Boolean journalHistory) {
		this.journalHistory = journalHistory;
	}

	public String getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(String bookingDate) {
		this.bookingDate = bookingDate;
	}

	public String getBookingStartTime() {
		return bookingStartTime;
	}

	public void setBookingStartTime(String bookingStartTime) {
		this.bookingStartTime = bookingStartTime;
	}

	public String getBookingEndTime() {
		return bookingEndTime;
	}

	public void setBookingEndTime(String bookingEndTime) {
		this.bookingEndTime = bookingEndTime;
	}

	public Map<String, String> getPatientInformation() {
		return patientInformation;
	}

	public void setPatientInformation(Map<String, String> patientInformation) {
		this.patientInformation = patientInformation;
	}

	public Map<String, String> getDoctorInformation() {
		return doctorInformation;
	}

	public void setDoctorInformation(Map<String, String> doctorInformation) {
		this.doctorInformation = doctorInformation;
	}

	public String getDoctorExtraInformation() {
		return doctorExtraInformation;
	}

	public void setDoctorExtraInformation(String doctorExtraInformation) {
		this.doctorExtraInformation = doctorExtraInformation;
	}

}
