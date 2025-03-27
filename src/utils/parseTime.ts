const parseWorkshopTime = (t: number[]) => {
	const year = t[0];
	const month = t[1];
	const date = t[2];
	const hour = t[3];
	const minute = t[4];

	const fullDate = `${date}/${month}/${year}`;
	const time = `${hour}:${minute < 10 ? `0${minute}` : minute}`;

	return { fullDate, time };
};

const parseWorkshopTimeToDateObject = (t: number[]) => {
	return new Date(t[0], t[1] - 1, t[2], t[3], t[4]);
};

const dateParser = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();

	return hour + ':' + minute + ' ' + day + '/' + month + '/' + year;
};

export { parseWorkshopTime, dateParser, parseWorkshopTimeToDateObject };
