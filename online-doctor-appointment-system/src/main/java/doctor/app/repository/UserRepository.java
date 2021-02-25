package doctor.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import doctor.app.models.Doctor;
import doctor.app.models.Patient;
import doctor.app.models.User;

/**
 * 
 * @author Team one
 * This class provides the mechanism for storage, retrieval, search, update and delete operation on objects.
 *
 */ 

@Repository
public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
  
  Optional<Doctor> findDoctorById(String id);
  Optional<Patient> findPatientById(String id);
	
	@Query("{ 'ailmentList' : ?0}") //NOSQL QUERY
	List<Doctor> findDoctorByAilment(@Param("ailment") String ailment);
	
	@Query("{ 'address.city' : ?0, 'roles.id' : ?1}")
	List<Doctor> findDoctorByLocation(String location, String role);
	
	@Query("{ 'firstName': ?0, 'address.city' : ?1}")
	List<Doctor> findDoctorAndLocation(String firstName, String location);
	
	@Query("{ 'roles.id': ?0}")
	List<Doctor> findAllDoctorLocations(String role);
	
	@Query("{'address.city': ?0, 'ailmentList' : ?1 }")
	List<Doctor> findDoctorsByAilmentAndLocation(String location, String ailment);

	@Query(value = "{}", fields ="{'address.city': 1 }")
    List<Doctor> findAllDistinctCity();	
	
	@Query(value = "{}", fields ="{'ailmentList': 1 }")
    List<Doctor> findAllDistinctAilment();	
}
