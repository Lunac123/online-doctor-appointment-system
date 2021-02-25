package doctor.app;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class DummyDataForTest {
	
	static String useFirstName = "Håkan";
	static String useLastName = "Björk";
	static String useDoctorFirstName = "Ebba";
	static String useDoctorLastName = "Hultgren";
	static String usePatientFirstName = "Mikael";
	static String usePatientLastName = "Sten";
	
	static String usePhoneNumber = "+46703237740";
	static String useEmail = "hakbjo@gmail.com";
	static String useZipCode = "837 95";
	static String useStreetAddress = "Murarvägen 4";
	static String useCity = "Undersåker";
	
	static String useUsername = "hakbjo";
	static String usePassword = "supertrickyP@ssw0rd";
	
	static String useDoctorId = "5ffef47b9407e72bb837a73f";
	static String usePatientId = "600ac6855d8f627ceca18610";
	static String useAppointmentId = "600d7a1503362f106bb256b8";
	static String useAppointmentId2 = "6012b7d915faa71bc537d533";
	
	static String useBookingDate = "2021-02-01";
	static String useBookingTime = "15:00";  // not used…
	static String useBookingStartTime = "11:00";
	static String useBookingEndTime = "12:00";
	
	static String useFeedbackMessage = "Feedback from user";
	static String useDoctorFeedback = "Feedback from doctor No";
	static String usePatientFeedback = "Feedback from patient Zero";
	
	static String useTreatedAilment = "Caffeine poisoning";
	
	static boolean useVerified = true;  // verified user (patient)
	static boolean useActive = false;  //  appointment status
	
	static List<String> useAilmentList = Arrays.asList("acne", "allergies");
	
	@SuppressWarnings("serial")
	static Map<String, String> useAddress = new HashMap<String, String>() {
		{
			put("streetAddress", useStreetAddress);
			put("city", useCity);
			put("zipCode", useZipCode);
		}
	};
	@SuppressWarnings("serial")
	static Map<String, String> useDoctorInfo = new HashMap<String, String>() {
		{
			put("doctorId", useDoctorId);
			put("doctorFirstname", useDoctorFirstName);
			put("doctorLastName", useDoctorLastName);
		}
	};
	@SuppressWarnings("serial")
	static Map<String, String> usePatientInfo = new HashMap<String, String>() {
		{
			put("patientId", usePatientId);
			put("patientFirstName", usePatientFirstName);
			put("patientLastName", usePatientLastName);
		}
	};

}
