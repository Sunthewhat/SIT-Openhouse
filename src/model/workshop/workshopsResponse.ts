type WorkshopData = {
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
	reservationCount: number;
	reserved: number;
	remainingSeats: number;
	attendCount: number;
	reserveClose?: number[];
	reserveOpen?: number[];
};

export type { WorkshopData };
