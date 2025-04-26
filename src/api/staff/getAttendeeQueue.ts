import { AttendeeResponse } from '@/model/staff/attendee';
import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const getAttendeeQueue = async (id: number) => {
	try {
		const token = staffCookieHandler.getCred();
		const data = await Axios.staff.get<AttendeeResponse>(`getEventQueue?eventID=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			success: true,
			data: data.data,
		};
	} catch (e) {
		console.log(e);

		return {
			success: false,
			data: null,
		};
	}
};

export { getAttendeeQueue };
