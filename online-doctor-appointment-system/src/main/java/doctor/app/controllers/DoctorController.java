package doctor.app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import doctor.app.models.Doctor;
import doctor.app.models.User;
import doctor.app.repository.UserRepository;
import doctor.app.services.DoctorService;

/**
 * 
 * @author Team One
 * 
 * Controller class to handle any requests coming from the client having URI "/api/doctor".
 * The methods annotated with @GetMapping will be invoked if the client sends a GET request to the "/api/doctor" URI.
 * The methods annotated with @PostMapping will be invoked if the client sends a POST request to the "/api/doctor" URI.
 * The methods annotated with @PutMapping will be invoked if the client sends a PUT request to the "/api/doctor" URI.
 *
 */

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(value = "/api/doctor")
@RestController

public class DoctorController {

	@Autowired
	private DoctorService doctorService;		
	 
	/**
	 * Endpoint to get doctor based on ailment
	 * @param ailment
	 * @return
	 */	
	@PostMapping(value="/")
	public List<Doctor> findDoctorByAilment(String ailment) {
		return doctorService.findDoctorByAilment(ailment);
	}
	
	/**
	 * Endpoint to get specific doctor
	 * @param id
	 * @return
	 */
	@GetMapping(value="/finddoctor/{id}")
	public Optional<Doctor> findDoctorById(@PathVariable(value= "id") String id) {
		return doctorService.findDoctorById(id);
	}
	
	/**
	 * Endpoint to get doctor based on location
	 * @param location
	 * @param role
	 * @return
	 */
	@GetMapping(value="/findbylocation/{location}/{role}")
	public List<Doctor> findDoctorByLocation(@PathVariable String location, @PathVariable String role) {
		return doctorService.findDoctorByLocation(location, role);
	}
	
	/**
	 * Endpoint to get all doctor locations
	 * @param role
	 * @return
	 */
	@GetMapping(value="/doctorlocations/{role}")
	public List<Doctor> findAllDoctorLocations(@PathVariable(value="role") String role) {
		return doctorService.findAllDoctorLocations(role);
	}
	
	/**
	 * Endpoint to get all doctors based on location and ailment
	 * @param location
	 * @param ailment
	 * @return
	 */
	@GetMapping(value="/findbyailmentandlocation/{location}/{ailment}")
	public List<Doctor> findDoctorsByAilmentAndLocation(@PathVariable String location, @PathVariable String ailment) {
		return doctorService.findDoctorsByAilmentAndLocation(location, ailment);
	}
	
	/**
	 * Endpoint to update doctor
	 * @param id
	 * @param doctorDetails
	 * @return
	 * @throws Exception
	 */
	@PutMapping(value="/updatedoctor/{id}")
    public User updateDoctor(@PathVariable(value = "id") String id,
        @RequestBody User doctorDetails) throws Exception   {
    	User doctor = doctorService.findDoctorById(id).orElseThrow(() -> new Exception("Doctor not found for this id :: " + id));
    	return doctorService.updateDoctorProfile(doctor, doctorDetails);
    } 
	
	/**
	 * Endpoint to get all distinct citys
	 * @param sort
	 * @return
	 */
	@GetMapping(value="/doctorlocations")
	public List<Doctor> findAllDistinctCity(Sort sort) {
		return doctorService.findAllDistinctCity();
	}
	
	/**
	 * Endpoint to get all distinct ailment
	 * @return
	 */
	@GetMapping(value="/doctorailment")
	public List<Doctor> findAllDistinctAilment() {
		return doctorService.findAllDistinctAilment();
	}
}
