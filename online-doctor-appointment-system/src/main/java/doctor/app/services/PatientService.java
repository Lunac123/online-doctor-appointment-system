package doctor.app.services;

import java.util.Optional;

import doctor.app.models.Patient;

public interface PatientService {
	
	Optional<Patient> findPatientById(String id);
}