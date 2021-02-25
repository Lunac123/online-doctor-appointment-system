package doctor.app.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import doctor.app.models.AppointmentHistory;
import doctor.app.models.Doctor;
import doctor.app.models.User;
import doctor.app.repository.AppointmentHistoryRepository;
import doctor.app.repository.UserRepository;

@Service
public class DoctorServiceImpl implements DoctorService {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public List<Doctor> findDoctorByAilment(String ailment) {
		return userRepository.findDoctorByAilment(ailment.toLowerCase());
	}
	
	/**
	 * Converts the first letter in a search to an upper case letter (example östersund becomes Östersund)
	 */
	@Override
	public List<Doctor> findDoctorByLocation(String location, String role) {
		String firstLetterByUpperCase = location.substring(0, 1).toUpperCase() + location.substring(1);
		return userRepository.findDoctorByLocation(firstLetterByUpperCase, role);
	}
	
	@Override
	public Optional<Doctor> findDoctorById(String id) {
		return userRepository.findDoctorById(id);
	}
	
	/**
	 * Update doctor profile
	 */
	@Override
	public User updateDoctorProfile(User orgDoctor, User newDoctor) {
		Map<String, String> address = new HashMap<>();
		
		orgDoctor.setLastName(newDoctor.getLastName());
		orgDoctor.setFirstName(newDoctor.getFirstName());
		orgDoctor.setPhoneNumber(newDoctor.getPhoneNumber());
		
		address.put("zipCode", newDoctor.getZipCode());
		address.put("streetAddress", newDoctor.getStreetAddress());
		address.put("city", newDoctor.getCity());
		
		orgDoctor.setAddress(address);
        final User updatedDoctor = userRepository.save(orgDoctor);

		return updatedDoctor;
	}	
		
	@Override
	public List<Doctor> findDoctorAndLocation(String firstName, String location) {
		return userRepository.findDoctorAndLocation(firstName, location);
	}
	@Override
	public List<Doctor> findDoctorsByAilmentAndLocation(String location, String ailment) {
		return userRepository.findDoctorsByAilmentAndLocation(location, ailment);
	}
	@Override
	public List<Doctor> findAllDoctorLocations(String role) {
		return userRepository.findAllDoctorLocations(role);
	}
	@Override
	public List<Doctor> findAllDistinctAilment() {
	
	return userRepository.findAllDistinctAilment();
	}

	@Override
	public List<Doctor> findAllDistinctCity() {
		return userRepository.findAllDistinctCity();
	}
}
