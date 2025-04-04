import { globalConstants } from '@/constants/global';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { Axios } from '@/utils/axios';

type getWorkshopAPIData = {
	openingEvents: WorkshopData[];
	upcomingEvents: WorkshopData[];
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

		const openingEvents: WorkshopData[] = [];
		const upcomingEvents: WorkshopData[] = [];
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
			// TODO seperate opening and upcoming
			openingEvents.push(d);
		});

		openingEvents.sort((a, b) => {
			const at = a.startAt;
			const bt = b.startAt;
			if (at[0] !== bt[0]) return at[0] - bt[0];
			if (at[1] !== bt[1]) return at[1] - bt[1];
			if (at[2] !== bt[2]) return at[2] - bt[2];
			if (at[3] !== bt[3]) return at[3] - bt[3];
			return at[4] - bt[4];
		});

		return { openingEvents, upcomingEvents };
	} catch (e) {
		console.error(e);
		return { openingEvents: [], upcomingEvents: [] };
	}
};

export { getWorkshopAPI };
export type { getWorkshopAPIData };
