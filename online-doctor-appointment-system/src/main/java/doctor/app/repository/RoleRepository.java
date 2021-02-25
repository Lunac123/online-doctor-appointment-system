package doctor.app.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import doctor.app.models.ERole;
import doctor.app.models.Role;

/**
 * 
 * @author Team one
 * This class provides the mechanism for storage, retrieval, search, update and delete operation on objects.
 *
 */ 

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
