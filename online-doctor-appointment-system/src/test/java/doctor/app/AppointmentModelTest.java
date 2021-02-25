package doctor.app;


import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;

import doctor.app.models.Appointment;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@DisplayName("APPOINTMENT  MODEL TESTS")
class AppointmentModelTest extends DummyDataForTest {
	
//	@Test
//	@DisplayName("Console log all data used in the tests")
//	void echoTestData() {
//		System.out.println("DATA USED IN TEST: (appointment model tests)");
//		System.out.println("      patientInfo: " + usePatientInfo);
//		System.out.println("       doctorInfo: " + useDoctorInfo);
//		System.out.println("           active: " + useActive);
//		System.out.println("      bookingDate: " + useBookingDate);
//		System.out.println(" bookingStartTime: " + useBookingStartTime);
//		System.out.println("   bookingEndTime: " + useBookingEndTime);
//		System.out.println("   doctorFeedback: " + useDoctorFeedback);
//		System.out.println("  patientFeedback: " + usePatientFeedback);
//		System.out.println("   treatedAilment: " + useTreatedAilment);
//	}

	
	@Test
	@DisplayName("Create an appointment")
	void testCreateAppointmentViaClassConstructor() {
		Appointment appointmentTest = new Appointment(usePatientInfo, useDoctorInfo, useActive, useBookingDate, useBookingStartTime, useBookingEndTime, useDoctorFeedback, usePatientFeedback, useTreatedAilment);
		assertAll(
			() -> assertEquals(usePatientInfo.toString(), appointmentTest.getPatientInformation().toString()),  // "{patientId=600ac6855d8f627ceca18610, patientFirstName=Mikael, patientLastName=Sten}"
			() -> assertEquals(useDoctorInfo.toString(), appointmentTest.getDoctorInformation().toString()),  // "{doctorLastName=Hultgren, doctorId=5ffef47b9407e72bb837a73f, doctorFirstname=Ebba}"
			() -> assertEquals(useActive, appointmentTest.getActive()), 
			() -> assertEquals(useBookingDate, appointmentTest.getBookingDate()),
			() -> assertEquals(useBookingStartTime, appointmentTest.getBookingStartTime()), 
			() -> assertEquals(useBookingEndTime, appointmentTest.getBookingEndTime()),
			() -> assertEquals(useDoctorFeedback, appointmentTest.getDoctorFeedback()),
			() -> assertEquals(usePatientFeedback, appointmentTest.getPatientFeedback()),
			() -> assertEquals(useTreatedAilment, appointmentTest.getTreatedAilment())
		);
	}

}
