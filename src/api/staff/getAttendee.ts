import { AttendeeResponse } from '@/model/staff/attendee';
import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const getAttendee = async (id: number) => {
	try {
		const token = staffCookieHandler.getCred();
		const data = await Axios.staff.get<AttendeeResponse>(`getEventAttendee?eventID=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			success: true,
			data: data.data,
		};
	} catch (e) {
		return {
			success: false,
			data: null,
		};
	}
};

export { getAttendee };
