export type AttendeeResponse = Attendee[];

export type Attendee = {
	attendeeUuid: string;
	firstname: string;
	lastname: string;
	schoolname: string;
	isAttended: boolean;
	isQueue: boolean;
};
