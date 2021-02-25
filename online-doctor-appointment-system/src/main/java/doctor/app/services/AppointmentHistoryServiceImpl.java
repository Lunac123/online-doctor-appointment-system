package doctor.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import doctor.app.models.Appointment;
import doctor.app.models.AppointmentHistory;
import doctor.app.repository.AppointmentHistoryRepository;

@Service
public class AppointmentHistoryServiceImpl implements AppointmentHistoryService{
	
	@Autowired
	AppointmentHistoryRepository appointmentHistoryRepository;
	
	public List<AppointmentHistory> findAppointmentsByDoctorId(String id) {
		return appointmentHistoryRepository.findAppointmentsByDoctorId(id);
	}
	
	public List<AppointmentHistory> findAppointmentsByPatientId(String id) {
		return appointmentHistoryRepository.findAppointmentsByPatientId(id);
	}	
	
	public AppointmentHistory saveAppointmentHistory(AppointmentHistory information) {
		return appointmentHistoryRepository.save(information);
	}

	@Override
	public AppointmentHistory findAppointmentByAppointmentId(String id) {
		return appointmentHistoryRepository.findAppointmentById(id);
	}

	/**
	 *  Update details in appointment history as a doctor
	 */
	@Override
	public AppointmentHistory updateAppointmentHistoryDetailsDoctor(AppointmentHistory orgAppointment, AppointmentHistory newAppointment) {	
				
	orgAppointment.setTreatedAilment(newAppointment.getTreatedAilment());	
	orgAppointment.setAppointmentDate(newAppointment.getAppointmentDate());
	orgAppointment.setAppointmentTime(newAppointment.getAppointmentTime());
	orgAppointment.setDoctorFeedback(newAppointment.getDoctorFeedback());

        final AppointmentHistory updatedAppointment = appointmentHistoryRepository.save(orgAppointment);
       
		return updatedAppointment;
	}
	
	/**
	 *  Update feedback in appointment history as a patient patient
	 */
	@Override
	public AppointmentHistory updateAppointmentHistoryFeedbackPatient(AppointmentHistory orgAppointment, AppointmentHistory newAppointment) {	
				
	orgAppointment.setPatientFeedback(newAppointment.getPatientFeedback());

        final AppointmentHistory updatedAppointment = appointmentHistoryRepository.save(orgAppointment);
       
		return updatedAppointment;
	}
}
