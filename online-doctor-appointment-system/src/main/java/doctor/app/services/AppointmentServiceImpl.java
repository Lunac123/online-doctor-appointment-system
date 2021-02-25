package doctor.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import doctor.app.models.Appointment;
import doctor.app.models.AppointmentHistory;
import doctor.app.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Override
	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();
	}
	
	@Override
	public List<Appointment> findAppointmentByPatientId(String id) {
		return appointmentRepository.findByPatientId(id);
	}
	
	@Override
	public List<Appointment> findAppointmentByDoctorId(String id) {
		return appointmentRepository.findByDoctorId(id);
	}
	
	@Override
	public Appointment findAppointmentByAppointmentId(String id) {
		return appointmentRepository.findAppointmentById(id);
	}

	@Override
	public Appointment updateAppointmentFeedbackHistory(Appointment orgAppointment, Appointment newAppointment) {
        final Appointment updatedAppointment = appointmentRepository.save(orgAppointment);
        orgAppointment.setFeedbackHistory(newAppointment.getFeedbackHistory());
		return updatedAppointment;
	}
	
	@Override
	public Appointment updateAppointmentJournalHistory(Appointment orgAppointment, Appointment newAppointment) {
        final Appointment updatedAppointment = appointmentRepository.save(orgAppointment);
        orgAppointment.setJournalHistory(newAppointment.getJournalHistory());
		return updatedAppointment;
	}
	
	/** 
	 * Update appointment details
	 */
	@Override
	public Appointment updateAppointmentDetails(Appointment orgAppointment, Appointment newAppointment) {	
		
		orgAppointment.setBookingDate(newAppointment.getBookingDate());
		orgAppointment.setBookingStartTime(newAppointment.getBookingStartTime());
		orgAppointment.setBookingEndTime(newAppointment.getBookingEndTime());
		orgAppointment.setDoctorFeedback(newAppointment.getDoctorFeedback());
		orgAppointment.setPatientFeedback(newAppointment.getPatientFeedback());
		orgAppointment.setTreatedAilment(newAppointment.getTreatedAilment());
		orgAppointment.setActive(newAppointment.getActive());
		orgAppointment.setJournalHistory(newAppointment.getJournalHistory());
		orgAppointment.setFeedbackHistory(newAppointment.getFeedbackHistory());
		orgAppointment.setDoctorExtraInformation(newAppointment.getDoctorExtraInformation());
        final Appointment updatedAppointment = appointmentRepository.save(orgAppointment);
       
		return updatedAppointment;
	}

	public List<Appointment> findAppointmentsByDoctorId(String id, Boolean journalHistory) {
		return appointmentRepository.findAppointmentsByDoctorId(id, journalHistory);
	}
	
	public List<Appointment> findAppointmentsByPatientId(String id) {
		return appointmentRepository.findAppointmentsByPatientId(id);
	}	
	
	public Appointment saveAppointmentHistory(Appointment information) {
		return appointmentRepository.save(information);
	}

	/**
	 * Update details in appointment history as a doctor
	 */
	@Override
	public Appointment updateAppointmentHistoryDetailsDoctor(Appointment orgAppointment, Appointment newAppointment) {	
				
	orgAppointment.setTreatedAilment(newAppointment.getTreatedAilment());	
	orgAppointment.setBookingDate(newAppointment.getBookingDate());
	orgAppointment.setBookingStartTime(newAppointment.getBookingStartTime());
	orgAppointment.setDoctorFeedback(newAppointment.getDoctorFeedback());

        final Appointment updatedAppointment = appointmentRepository.save(orgAppointment);
       
		return updatedAppointment;
	}
	
	/**
	 * Update feedback in appointment history as a patient patient
	 */
	@Override
	public Appointment updateAppointmentHistoryFeedbackPatient(Appointment orgAppointment, Appointment newAppointment) {	
				
	orgAppointment.setPatientFeedback(newAppointment.getPatientFeedback());

        final Appointment updatedAppointment = appointmentRepository.save(orgAppointment);
       
		return updatedAppointment;
	}
	
	@Override
	public Appointment updateDoctorExtraInformation(Appointment orgAppointment, Appointment newAppointment) {	
				
	orgAppointment.setDoctorExtraInformation(newAppointment.getDoctorExtraInformation());

        final Appointment updatedAppointment = appointmentRepository.save(orgAppointment);
       
		return updatedAppointment;
	}
	
}
