import { globalConstants } from '@/constants/global';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { Axios } from '@/utils/axios';

type getEventDetailByIdResponse = {
	success: boolean;
	workshop: WorkshopData | null;
};

const getEventDetailById = async (id: number): Promise<getEventDetailByIdResponse> => {
	try {
		const data = await Axios.workshop.get<WorkshopData>(`/anEvent?eventID=${id}`);
		return {
			success: true,
			workshop: {
				...data.data,
				imagepath: `${globalConstants.IMAGE_PATH}${data.data.imagepath}`,
			},
		};
	} catch (e) {
		console.log(e);
		
		return {
			success: false,
			workshop: null,
		};
	}
};

export { getEventDetailById };
