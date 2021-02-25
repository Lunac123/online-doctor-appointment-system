package doctor.app.services;

import java.util.List;

import doctor.app.models.Appointment;
import doctor.app.models.AppointmentHistory;

public interface AppointmentService {

	List<Appointment> getAllAppointments();
	List<Appointment> findAppointmentByPatientId(String id);
	List<Appointment> findAppointmentByDoctorId(String id);	
	List<Appointment> findAppointmentsByDoctorId(String id, Boolean journalHistory);
	List<Appointment> findAppointmentsByPatientId(String id);
	
	Appointment findAppointmentByAppointmentId(String id);
	Appointment updateAppointmentDetails(Appointment orgAppointment, Appointment newAppointment);
	Appointment updateAppointmentFeedbackHistory(Appointment orgAppointment, Appointment newAppointment);
	Appointment updateAppointmentJournalHistory(Appointment orgAppointment, Appointment newAppointment);	
	Appointment saveAppointmentHistory(Appointment information);
	Appointment updateAppointmentHistoryDetailsDoctor(Appointment orgAppointment, Appointment newAppointment);
	Appointment updateAppointmentHistoryFeedbackPatient(Appointment orgAppointment, Appointment newAppointment);
	Appointment updateDoctorExtraInformation(Appointment orgAppointment, Appointment newAppointment);
	
}
