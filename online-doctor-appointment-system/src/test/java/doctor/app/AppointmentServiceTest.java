package doctor.app;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import doctor.app.models.Appointment;
import doctor.app.repository.AppointmentRepository;
import doctor.app.services.AppointmentServiceImpl;


@SpringBootTest
@DisplayName("APPOINTMENT  SERVICE TESTS")
class AppointmentServiceTest extends DummyDataForTest {

//	@Test
//	@DisplayName("Console log all data used in the tests")
//	void echoTestData() {
//		System.out.println("DATA USED IN TEST: (appointment service tests)");
//		System.out.println("      patientInfo: " + usePatientInfo);
//		System.out.println("       doctorInfo: " + useDoctorInfo);
//		System.out.println("           active: " + useActive);
//		System.out.println("      bookingDate: " + useBookingDate);
//		System.out.println(" bookingStartTime: " + useBookingStartTime);
//		System.out.println("   bookingEndTime: " + useBookingEndTime);
//		System.out.println("   doctorFeedback: " + useDoctorFeedback);
//		System.out.println("  patientFeedback: " + usePatientFeedback);
//		System.out.println("   treatedAilment: " + useTreatedAilment);
//		System.out.println("  appointmentStub: " + useAppointmentId);
//		System.out.println("  mockAppointment: " + useAppointmentId);
//	}


	@InjectMocks
	private AppointmentServiceImpl service;

	@Mock
	private AppointmentRepository repository;


	@Test
	@DisplayName("findAppointmentById - success")
	void testFindAppointmentByIdSuccess() {
		Appointment appointmentStub = new Appointment(usePatientInfo, useDoctorInfo, useActive, useBookingDate, useBookingStartTime, useBookingEndTime,
				useDoctorFeedback, usePatientFeedback, useTreatedAilment);
		when(repository.findAppointmentById(useAppointmentId)).thenReturn(appointmentStub);
		Appointment mockAppointment = service.findAppointmentByAppointmentId(useAppointmentId);
		assertThat(mockAppointment.getId(), is(appointmentStub.getId()));
	}

	@Test
	@DisplayName("findAppointmentById - not found")
	void testFindAppointmentByIdNotFound() {
		Appointment appointmentStub = new Appointment(usePatientInfo, useDoctorInfo, useActive, useBookingDate, useBookingStartTime, useBookingEndTime,
				useDoctorFeedback, usePatientFeedback, useTreatedAilment);
		when(repository.findAppointmentById(useAppointmentId)).thenReturn(appointmentStub);
		assertThat(useAppointmentId2, not(appointmentStub.getId()));
	}

}
