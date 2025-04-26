import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const deleteQueue = async (eventId: number, attendeeUuid: string) => {
	try {
		const token = staffCookieHandler.getCred();
		const resp = await Axios.staff.get(
			`/deleteEventQueue?eventID=${eventId}&attendeeUuid=${attendeeUuid}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log(resp);

		return resp.status < 400;
	} catch (e) {
		return false;
	}
};

export { deleteQueue };
