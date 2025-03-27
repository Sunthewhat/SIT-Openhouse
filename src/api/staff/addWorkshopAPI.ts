import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const getConfirmedWorkshopAPI = async (uuid: string) => {
	const token = staffCookieHandler.getCred();
	const response = await Axios.staff.get<number[]>('/getConfirmedWorkshops?uuid=' + uuid, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.status !== 200) {
		return [];
	}

	return response.data;
};

const addWorkshopAPI = async (wid: number[], uuid: string) => {
	const token = staffCookieHandler.getCred();
	const response = await Promise.all(
		wid.map((id) => {
			return Axios.staff.post(
				'/addExistedToWorkshop',
				{
					workshopID: id,
					attendeeUuid: uuid,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		})
	);
	if (response.some((res) => res.status !== 200)) {
		return false;
	}
	return true;
};

export { getConfirmedWorkshopAPI, addWorkshopAPI };
