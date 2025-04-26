import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const addExistedToQueueAPI = async (wid: number, uuid: string) => {
	try {
		const token = staffCookieHandler.getCred();
		const resp = await Axios.staff.get(
			`/addExistedToQueue?attendeeUuid=${uuid}&eventID=${wid}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return {
			success: resp.status < 400,
			msg: resp.data,
		};
	} catch (e) {
		console.log(e);
		return {
			success: false,
			msg: 'Network Error',
		};
	}
};

export { addExistedToQueueAPI };
