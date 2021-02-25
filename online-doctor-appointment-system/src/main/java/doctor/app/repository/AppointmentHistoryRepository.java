package doctor.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import doctor.app.models.AppointmentHistory;

/**
 * 
 * @author Team one
 * This class provides the mechanism for storage, retrieval, search, update and delete operation on objects.
 *
 */

@Repository
public interface AppointmentHistoryRepository extends MongoRepository<AppointmentHistory, String> {

	@Query("{ 'doctorId' : ?0}") //NOSQL QUERY
	List<AppointmentHistory> findAppointmentsByDoctorId(@Param("id") String id);
	
	@Query("{ 'patientId' : ?0}") //NOSQL QUERY
	List<AppointmentHistory> findAppointmentsByPatientId(@Param("id") String id);
	
	@Query("{ 'id' : ?0}") //NOSQL QUERY
	AppointmentHistory findAppointmentById(@Param("id") String id);
}
