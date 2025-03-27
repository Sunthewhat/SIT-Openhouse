import { globalConstants } from '@/constants/global';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { Axios } from '@/utils/axios';

type getWorkshopAPIData = {
	morningEvents: WorkshopData[];
	noonEvents: WorkshopData[];
	afterNoonEvents: WorkshopData[];
};

type seatsSummaryResponse = {
	eventID: number;
	name: string;
	remainingSeats: number;
	reserved: number;
	attendCount: number;
};

type WorkshopResponse = {
	id: number;
	uuid: string;
	name: string;
	shortdescription: string;
	description: string;
	seats: number;
	createdAt: number[];
	updatedAt: number[];
	vanue: string;
	startAt: number[];
	endAt: number[];
	imagepath: string | null;
};

const getWorkshopAPI = async (): Promise<getWorkshopAPIData> => {
	try {
		const workshopData = (await Axios.workshop.get<WorkshopResponse[]>('')).data;
		const seatsData = (await Axios.workshop.get<seatsSummaryResponse[]>('/eventSeatSummary'))
			.data;

		const morningEvents: WorkshopData[] = [];
		const noonEvents: WorkshopData[] = [];
		const afterNoonEvents: WorkshopData[] = [];
		const data: WorkshopData[] = workshopData.map((w): WorkshopData => {
			const reservationCount = seatsData.find((s) => s.eventID == w.id);
			return {
				...w,
				reservationCount: reservationCount?.reserved || 0,
				imagepath: w.imagepath ? globalConstants.IMAGE_PATH + w.imagepath : null,
				reserved: reservationCount?.reserved || 0,
				remainingSeats: reservationCount?.remainingSeats || 0,
				attendCount: reservationCount?.attendCount || 0,
			};
		});
		data.map((d) => {
			const t = d.startAt[3];
			if (t > 13) afterNoonEvents.push(d);
			else if (t > 9) noonEvents.push(d);
			else morningEvents.push(d);
		});

		return { morningEvents, noonEvents, afterNoonEvents };
	} catch (e) {
		console.error(e);
		return { morningEvents: [], noonEvents: [], afterNoonEvents: [] };
	}
};

export { getWorkshopAPI };
export type { getWorkshopAPIData };
