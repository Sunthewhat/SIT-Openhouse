'use client';
import { deleteQueue } from '@/api/staff/deleteQueue';
import { getAttendee } from '@/api/staff/getAttendee';
import { getAttendeeQueue } from '@/api/staff/getAttendeeQueue';
import { getEventDetailById } from '@/api/staff/getEventDetailById';
import { reclaimSeats } from '@/api/staff/reclaimSeats';
import { StaffBanner } from '@/components/staff/staffBanner';
import { Attendee, AttendeeResponse } from '@/model/staff/attendee';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { parseWorkshopTime, parseWorkshopTimeToDateObject } from '@/utils/parseTime';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const WorkshopDetailMonitorPage: FC = () => {
	const eventId = parseInt(useParams<{ id: string }>().id);
	const navigator = useRouter();
	const [event, setEvent] = useState<WorkshopData>();
	const [attendee, setAttendee] = useState<AttendeeResponse>([]);
	const [queue, setQueue] = useState<AttendeeResponse>([]);

	const [searchParam, setSearchParam] = useState('');
	const [displayAttendee, setDisplayAttendee] = useState<AttendeeResponse>([]);
	const [displayQueue, setDisplayQueue] = useState<AttendeeResponse>([]);

	const [isLoading, setIsLoading] = useState(true);
	const [isConfirmingReclaim, setIsConfirmingReclaim] = useState(false);
	const [code, setCode] = useState('');

	const handleReclaimSeat = async () => {
		if (!event?.startAt) return;
		const now = new Date();
		const eventStart = parseWorkshopTimeToDateObject(event.startAt);
		if (now < eventStart) return;
		if (code !== 'Rungnapa') return;
		await reclaimSeats(event.id);
		window.location.reload();
	};

	const handleRefresh = async () => {
		setDisplayAttendee([]);
		setDisplayQueue([]);
		fetchWorkshop();
	};

	const fetchWorkshop = async () => {
		const workshop = await getEventDetailById(eventId);
		const attendee = await getAttendee(eventId);
		const queue = await getAttendeeQueue(eventId);
		if (
			!workshop.success ||
			workshop.workshop === null ||
			!attendee.success ||
			attendee.data === null ||
			!queue.success ||
			queue.data === null
		)
			return navigator.back();
		setEvent(workshop.workshop);
		setAttendee(attendee.data);
		setDisplayAttendee(attendee.data);
		setQueue(queue.data);
		setDisplayQueue(queue.data);
		setIsLoading(false);
	};

	const handleSearch = (value: string) => {
		setSearchParam(value);
		if (value === '') {
			setDisplayAttendee(attendee);
			setDisplayQueue(queue);
			return;
		}
		setDisplayAttendee(
			attendee.filter(
				(d) =>
					d.firstname.includes(value) ||
					d.lastname.includes(value) ||
					d.schoolname.includes(value)
			)
		);
		setDisplayQueue(
			queue.filter(
				(d) =>
					d.firstname.includes(value) ||
					d.lastname.includes(value) ||
					d.schoolname.includes(value)
			)
		);
	};

	useEffect(() => {
		fetchWorkshop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const AttendeeCard: FC<{ A: Attendee }> = ({ A }) => {
		const [isDeleting, setIsdeleting] = useState(false);
		const [isConfirming, setIsConfirming] = useState(false);
		const removeQueue = async (uuid: string) => {
			setIsdeleting(true);
			const resp = await deleteQueue(eventId, uuid);
			setIsdeleting(false);
			if (resp) fetchWorkshop();
		};
		return (
			<tr className={`h-10 ${isDeleting ? 'bg-slate-500' : ''}`}>
				<td>{A.firstname}</td>
				<td>{A.lastname}</td>
				<td>{A.schoolname}</td>
				<td className='text-center'>{A.isAttended ? 'Yes' : 'No'}</td>
				{A.isQueue == true && (
					<td>
						{!isConfirming && (
							<button
								className='bg-slate-400 p-1 rounded-md w-full'
								onClick={() => setIsConfirming(true)}
							>
								remove
							</button>
						)}
						{isConfirming && (
							<button
								className='bg-green-400 p-1 rounded-md w-full'
								onClick={() => setIsConfirming(false)}
							>
								cancel
							</button>
						)}
						{isConfirming && (
							<button
								className='bg-red-400 p-1 rounded-md w-full'
								onClick={() => removeQueue(A.attendeeUuid)}
							>
								confirm
							</button>
						)}
					</td>
				)}
			</tr>
		);
	};

	return (
		<div className='w-full max-w-screen-lg p-2 m-auto'>
			<StaffBanner primary='Staff Workshop' secondary='Detailed Monitor' />
			{!isLoading && event && attendee && queue && (
				<div className=' grid grid-cols-4 gap-4'>
					<div>
						{event.imagepath ? (
							<Image
								src={event.imagepath}
								alt={event.name}
								width={160}
								height={160}
								priority
								className='w-full object-cover rounded-lg aspect-[3/4]'
							/>
						) : (
							<div className='ImagePlaceholder w-[200px] lg:w-[300px] h-[100px] lg:h-[150px] bg-gradient rounded-2xl' />
						)}
					</div>
					<div className=' col-span-3 flex flex-col gap-4'>
						<div className='md:text-lg font-semibold'>{event.name}</div>
						<div className='md:text-lg font-semibold'>
							Start :
							{' ' +
								parseWorkshopTime(event.startAt).fullDate +
								'\t' +
								parseWorkshopTime(event.startAt).time}
						</div>
						<div className='md:text-lg font-semibold'>
							End :
							{' ' +
								parseWorkshopTime(event.endAt).fullDate +
								'\t' +
								parseWorkshopTime(event.endAt).time}
						</div>
						<div className='h-full md:flex'>
							{!isConfirmingReclaim && (
								<button
									className='bg-red-400 text-white md:text-lg font-semibold h-fit p-4 w-fit px-8 rounded-lg'
									onClick={() => setIsConfirmingReclaim(true)}
								>
									คืนที่นั่งที่จองแล้วแต่ไม่มาร่วมงาน
								</button>
							)}
							{isConfirmingReclaim && (
								<input
									value={code}
									placeholder='SECURITY CODE'
									onChange={(e) => setCode(e.target.value)}
									className='h-fit p-4 md:ml-5 mt-5 text-center rounded-lg'
								></input>
							)}
							<div className='flex gap-4 mt-5'>
								{isConfirmingReclaim && (
									<button
										className='bg-green-600 md:ml-10 text-white text-lg font-semibold h-fit p-4 w-fit px-8 rounded-lg'
										onClick={() => setIsConfirmingReclaim(false)}
									>
										ยกเลิก
									</button>
								)}
								{isConfirmingReclaim && (
									<button
										className='bg-red-600 md:ml-10 text-white text-lg font-semibold h-fit p-4 w-fit px-8 rounded-lg'
										onClick={handleReclaimSeat}
									>
										ยืนยัน?
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
			<div className='w-full flex-col grid grid-cols-2 justify-center items-center md:items-start'>
				<div className='w-full'>
					<label className='font-semibold'>Search</label>
					<div className='w-full flex mt-3 justify-between'>
						<input
							className='w-8/12 h-10 rounded-lg p-3'
							value={searchParam}
							onChange={(e) => handleSearch(e.target.value)}
							placeholder='Search'
						></input>
						<button
							className='w-3/12 text-white bg-blue-500 rounded-lg h-10'
							onClick={() => handleSearch('')}
						>
							clear
						</button>
					</div>
				</div>
				<div className='flex items-end justify-end h-full'>
					<button
						className='w-3/12 text-blue_dark bg-[#FFDE59] rounded-lg h-10'
						onClick={handleRefresh}
					>
						Refresh
					</button>
				</div>
			</div>
			<div className='grid md:grid-cols-2 w-full mt-10 gap-10 p-2'>
				<div className='flex flex-col'>
					<h1 className='text-center text-xl font-bold'>Attendee</h1>
					<table className='w-full'>
						<tbody>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>School</th>
								<th>Is Attended</th>
							</tr>
							{displayAttendee.map((a, i) => (
								<AttendeeCard A={a} key={i} />
							))}
						</tbody>
					</table>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-center text-xl font-bold'>Queue</h1>
					<table className='w-full'>
						<tbody>
							<tr>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>School</th>
								<th>Is Attended</th>
								<th></th>
							</tr>
							{displayQueue.map((a, i) => (
								<AttendeeCard A={a} key={i} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default WorkshopDetailMonitorPage;
