import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const reclaimSeats = async (id: number) => {
	try {
		const token = staffCookieHandler.getCred();
		const res = await Axios.staff.get(`/cancelUnattendedEventReservation?eventID=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.status === 200;
	} catch (e) {
		console.log(e);

		return false;
	}
};

export { reclaimSeats };
