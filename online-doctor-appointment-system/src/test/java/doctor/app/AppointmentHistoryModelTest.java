package doctor.app;


import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;

import doctor.app.models.AppointmentHistory;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@DisplayName("APPOINTMENT HISTORY  MODEL TESTS")
class AppointmentHistoryModelTest extends DummyDataForTest {
	
//	@Test
//	@DisplayName("Console log all data used in the tests")
//	void echoTestData() {
//		System.out.println("DATA USED IN TEST: (appointment history model tests)");
//		System.out.println("        patientId: " + usePatientId);
//		System.out.println("         doctorId: " + useDoctorId);
//		System.out.println("   treatedAilment: " + useTreatedAilment);
//		System.out.println(" bookingStartTime: " + useBookingStartTime);
//		System.out.println("      bookingDate: " + useBookingDate);
//		System.out.println("   doctorFeedback: " + useDoctorFeedback);
//		System.out.println("  patientFeedback: " + usePatientFeedback);		
//	}

	
	@Test
	@DisplayName("Create appointment history")
	void testCreateAppointmentHistoryViaClassConstructor() {
		AppointmentHistory appointmentHistoryTest = new AppointmentHistory(usePatientId, useDoctorId, useTreatedAilment, useBookingStartTime, useBookingDate, useDoctorFeedback, usePatientFeedback);
		assertAll(
			() -> assertEquals(usePatientId, appointmentHistoryTest.getPatientId()),
			() -> assertEquals(useDoctorId, appointmentHistoryTest.getDoctorId()),
			() -> assertEquals(useTreatedAilment, appointmentHistoryTest.getTreatedAilment()), 
			() -> assertEquals(useBookingStartTime, appointmentHistoryTest.getAppointmentTime()),
			() -> assertEquals(useBookingDate, appointmentHistoryTest.getAppointmentDate()), 
			() -> assertEquals(useDoctorFeedback, appointmentHistoryTest.getDoctorFeedback()),
			() -> assertEquals(usePatientFeedback, appointmentHistoryTest.getPatientFeedback())
		);
	}
	
}
