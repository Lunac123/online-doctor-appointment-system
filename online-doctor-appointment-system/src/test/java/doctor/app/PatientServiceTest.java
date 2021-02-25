package doctor.app;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import doctor.app.models.Patient;
import doctor.app.repository.UserRepository;
import doctor.app.services.PatientServiceImpl;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

import java.util.Optional;


@SpringBootTest
@DisplayName("PATIENT  SERVICE TESTS")
class PatientServiceTest extends DummyDataForTest {

//	@Test
//	@DisplayName("Console log all data used in the tests")
//	void echoTestData() {
//		System.out.println("DATA USED IN TEST: (patient service tests)");
//		System.out.println("        firstName: " + useFirstName);
//		System.out.println("         lastName: " + useLastName);
//		System.out.println("          address: " + useAddress);
//		System.out.println("      phoneNumber: " + usePhoneNumber);
//		System.out.println("            email: " + useEmail);
//		System.out.println("         verified: " + useVerified);
//		
//	}

	@InjectMocks
	private PatientServiceImpl service;

	@Mock
	private UserRepository repository;


	@Test
	@DisplayName("findPatientById - success")
	void testfindPatientByIdSuccess() {
		Patient patientStub = new Patient();
		patientStub.setFirstName(useFirstName);
		patientStub.setLastName(useLastName);
		patientStub.setAddress(useAddress);
		patientStub.setPhoneNumber(usePhoneNumber);
		patientStub.setEmail(useEmail);
		patientStub.setVerified(useVerified);

		when(repository.findPatientById(usePatientId)).thenReturn(Optional.of(patientStub));
		Optional<Patient> mockPatient = service.findPatientById(usePatientId);
		assertThat(mockPatient.get().getId(), is(patientStub.getId()));
	}

	@Test
	@DisplayName("findPatientById - not found")
	void testfindPatientByIdNotFound() {
		Patient patientStub = new Patient();
		patientStub.setFirstName(useFirstName);
		patientStub.setLastName(useLastName);
		patientStub.setAddress(useAddress);
		patientStub.setPhoneNumber(usePhoneNumber);
		patientStub.setEmail(useEmail);
		patientStub.setVerified(useVerified);

		when(repository.findPatientById(usePatientId)).thenReturn(Optional.of(patientStub));
		assertThat(useDoctorId, not(patientStub.getId()));
	}

}
