package doctor.app;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import doctor.app.models.AppointmentHistory;
import doctor.app.repository.AppointmentHistoryRepository;
import doctor.app.services.AppointmentHistoryServiceImpl;


@SpringBootTest
@DisplayName("APPOINTMENT HISTORY  SERVICE TESTS")
class AppointmentHistoryServiceTest extends DummyDataForTest {

//	@Test
//	@DisplayName("Console log all data used in the tests")
//	void echoTestData() {
//		System.out.println("DATA USED IN TEST: (appointment history service tests)");
//		System.out.println("        patientId: " + usePatientId);
//		System.out.println("         doctorId: " + useDoctorId);
//		System.out.println("   treatedAilment: " + useTreatedAilment);
//		System.out.println(" bookingStartTime: " + useBookingStartTime);
//		System.out.println("      bookingDate: " + useBookingDate);
//		System.out.println("   doctorFeedback: " + useDoctorFeedback);
//		System.out.println("  patientFeedback: " + usePatientFeedback);		
//	}


	@InjectMocks
	private AppointmentHistoryServiceImpl service;

	@Mock
	private AppointmentHistoryRepository repository;


	@Test
	@DisplayName("findAppointmentHistoryById - success")
	void testFindAppointmentByIdSuccess() {
		AppointmentHistory appointmentHistoryStub = new AppointmentHistory(usePatientId, useDoctorId, useTreatedAilment, useBookingStartTime, useBookingDate, useDoctorFeedback, usePatientFeedback);

		when(repository.findAppointmentById(useAppointmentId)).thenReturn(appointmentHistoryStub);
		AppointmentHistory mockAppointmentHistory = service.findAppointmentByAppointmentId(useAppointmentId);
		assertThat(mockAppointmentHistory.getId(), is(appointmentHistoryStub.getId()));
	}

	@Test
	@DisplayName("findAppointmentHistoryById - not found")
	void testFindAppointmentByIdNotFound() {
		AppointmentHistory appointmentHistoryStub = new AppointmentHistory(usePatientId, useDoctorId, useTreatedAilment, useBookingStartTime, useBookingDate, useDoctorFeedback, usePatientFeedback);

		when(repository.findAppointmentById(useAppointmentId)).thenReturn(appointmentHistoryStub);
		assertThat(useAppointmentId2, not(appointmentHistoryStub.getId()));
	}

}
