package doctor.app.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import doctor.app.models.Patient;
import doctor.app.services.PatientService;

/**
 * 
 * @author Team One
 * 
 * Controller class to handle any requests coming from the client having URI "/api/patient".
 * The methods annotated with @GetMapping will be invoked if the client sends a POST request to the "/api/patient URI.
 * 
 */ 

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api/patient")
@RestController

public class PatientsController {

	@Autowired
	private PatientService patientService;
	
	/**
	 * Endpoint to get specific patient
	 * @param id
	 * @return
	 */
	@GetMapping(value="/findpatient/{id}")
	public Optional<Patient> findPatientById(@PathVariable(value= "id") String id) {
		return patientService.findPatientById(id);
	}
}



