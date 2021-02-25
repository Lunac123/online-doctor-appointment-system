package doctor.app;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import doctor.app.models.Doctor;
import doctor.app.repository.UserRepository;
import doctor.app.services.DoctorServiceImpl;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

import java.util.Optional;


@SpringBootTest
@DisplayName("DOCTOR  SERVICE TESTS")
class DoctorServiceTest extends DummyDataForTest {

//	@Test
//	@DisplayName("Console log all data used in the tests")
//	void echoTestData() {
//		System.out.println("DATA USED IN TEST: (doctor service tests)");
//		System.out.println("         username: " + useUsername);
//		System.out.println("            email: " + useEmail);
//		System.out.println("         password: " + usePassword);
//		System.out.println("        firstName: " + useFirstName);
//		System.out.println("         lastName: " + useLastName);
//		System.out.println("          address: " + useAddress);
//		System.out.println("      phoneNumber: " + usePhoneNumber);
//		System.out.println("      ailmentList: " + useAilmentList);
//		System.out.println("         doctorId: " + useDoctorId);
//		System.out.println("        patientId: " + usePatientId);
//	}


	@InjectMocks
	private DoctorServiceImpl service;

	@Mock
	private UserRepository repository;


	@Test
	@DisplayName("findDoctorById - success")
	void testFindDoctorByIdSuccess() {
		Doctor doctorStub = new Doctor();
		doctorStub.setUsername(useUsername);
		doctorStub.setEmail(useEmail);
		doctorStub.setPassword(usePassword);
		doctorStub.setFirstName(useFirstName);
		doctorStub.setLastName(useLastName);
		doctorStub.setAddress(useAddress);
		doctorStub.setPhoneNumber(usePhoneNumber);
		doctorStub.setAilmentList(useAilmentList);
		doctorStub.setId(useDoctorId);

		when(repository.findDoctorById(useDoctorId)).thenReturn(Optional.of(doctorStub));
		Optional<Doctor> mockDoctor = service.findDoctorById(useDoctorId);
		assertThat(mockDoctor.get().getId(), is(doctorStub.getId()));
	}

	@Test
	@DisplayName("findDoctorById - not found")
	void testFindDoctorByIdNotFound() {
		Doctor doctorStub = new Doctor();
		doctorStub.setUsername(useUsername);
		doctorStub.setEmail(useEmail);
		doctorStub.setPassword(usePassword);
		doctorStub.setFirstName(useFirstName);
		doctorStub.setLastName(useLastName);
		doctorStub.setAddress(useAddress);
		doctorStub.setPhoneNumber(usePhoneNumber);
		doctorStub.setAilmentList(useAilmentList);
		doctorStub.setId(useDoctorId);

		when(repository.findDoctorById(useDoctorId)).thenReturn(Optional.of(doctorStub));
		assertThat(usePatientId, not(doctorStub.getId()));
	}

}
