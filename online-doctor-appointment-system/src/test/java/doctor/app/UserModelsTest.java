package doctor.app;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

import doctor.app.models.Doctor;
import doctor.app.models.Patient;
import doctor.app.models.User;


@SpringBootTest
@DisplayName("USER  MODELS TESTS")
class UserModelsTest extends DummyDataForTest {
	
//	@Test
//	@DisplayName("Console log all data used in the tests")
//	void echoTestData() {
//		System.out.println("DATA USED IN TEST: (user model tests)");
//		System.out.println("         userName: " + useUsername);
//		System.out.println("            email: " + useEmail);
//		System.out.println("         password: " + usePassword);
//		System.out.println("        firstName: " + useFirstName);
//		System.out.println("         lastName: " + useLastName);
//		System.out.println("          address: " + useAddress);
//		System.out.println("      phoneNumber: " + usePhoneNumber);
//		System.out.println("         verified: " + useVerified);
//		System.out.println("      ailmentList: " + useAilmentList);
//	}

	
	@Test
	@DisplayName("Create a new user")
	void testCreateUserViaClassConstructor() {
		User userTest = new User(useUsername, useEmail, usePassword, useFirstName, useLastName, useAddress, usePhoneNumber);

		assertEquals(useUsername, userTest.getUsername());
		assertEquals(useEmail, userTest.getEmail());
		assertEquals(usePassword, userTest.getPassword());
		assertEquals(useFirstName, userTest.getFirstName());
		assertEquals(useLastName, userTest.getLastName());
		assertEquals(useAddress.toString(), userTest.getAddress().toString());
		assertEquals(usePhoneNumber, userTest.getPhoneNumber());
	}

	
	@Test
	@DisplayName("Create a new patient")
	void testCreatePatientViaClassConstructor() {
		Patient patientTest = new Patient();

		patientTest.setFirstName(useFirstName);
		patientTest.setLastName(useLastName);
		patientTest.setAddress(useAddress);;
		patientTest.setPhoneNumber(usePhoneNumber);
		patientTest.setEmail(useEmail);
		patientTest.setVerified(useVerified);

		assertAll(
			() -> assertEquals(useFirstName, patientTest.getFirstName()),
			() -> assertEquals(useLastName, patientTest.getLastName()),
			() -> assertEquals(useAddress.toString(), patientTest.getAddress().toString()),
			() -> assertEquals(usePhoneNumber, patientTest.getPhoneNumber()),
			() -> assertEquals(useEmail, patientTest.getEmail()),
			() -> assertEquals(useVerified, patientTest.isVerified())
		);
	}

	
	@Test
	@DisplayName("Create a new doctor")
	void testCreateDoctorViaClassConstructor() {
		Doctor doctorTest = new Doctor();

		doctorTest.setUsername(useUsername);
		doctorTest.setEmail(useEmail);
		doctorTest.setPassword(usePassword);
		doctorTest.setFirstName(useFirstName);
		doctorTest.setLastName(useLastName);
		doctorTest.setAddress(useAddress);;
		doctorTest.setPhoneNumber(usePhoneNumber);
		doctorTest.setAilmentList(useAilmentList);
				
		assertAll(
			() -> assertEquals(useUsername, doctorTest.getUsername()),
			() -> assertEquals(useEmail, doctorTest.getEmail()),
			() -> assertEquals(usePassword, doctorTest.getPassword()),
			() -> assertEquals(useFirstName, doctorTest.getFirstName()),
			() -> assertEquals(useLastName, doctorTest.getLastName()),
			() -> assertEquals(useAddress.toString(), doctorTest.getAddress().toString()),
			() -> assertEquals(usePhoneNumber, doctorTest.getPhoneNumber()),
			() -> assertEquals(useAilmentList, doctorTest.getAilmentList())
		);
	}

}
