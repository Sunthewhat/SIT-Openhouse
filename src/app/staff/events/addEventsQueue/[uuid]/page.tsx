'use client';
import { getWorkshopAPI, getWorkshopAPIData } from '@/api/workshop/getWorkshop';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getConfirmedWorkshopAPI } from '@/api/staff/addWorkshopAPI';
import { SelectedWorkshopBanner } from '@/components/events/selectedWorkshopBanner';
import { parseWorkshopTimeToDateObject } from '@/utils/parseTime';
import { StaffBanner } from '@/components/staff/staffBanner';

const StaffWorkshopPage: FC = () => {
	const [workshops, setWorkshops] = useState<getWorkshopAPIData>();
	const [confirmedWorkshop, setConfirmedWorkshop] = useState<number[]>([]);
	const [newWorkshop, setNewWorkshop] = useState<WorkshopData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const UUID = useParams<{ uuid: string }>().uuid;

	const fetchWorkshops = async () => {
		const dat = await getWorkshopAPI();
		setWorkshops(dat);
		const confirmedWorkshopResponse = await getConfirmedWorkshopAPI(UUID);
		setConfirmedWorkshop(confirmedWorkshopResponse);

		setIsLoading(false);
	};

	useEffect(() => {
		fetchWorkshops();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='w-full max-w-screen-lg p-2 m-auto'>
			<StaffBanner primary='Staff Workshop' secondary='Walk-In Register' />
			{isLoading ? (
				<div className='h-full text-4xl font-bold flex items-center justify-center'>
					Loading
				</div>
			) : (
				<div className='w-full'>
					<div className='Morning'>
						<p className='text-2xl my-8 font-bold text-blue_dark'>Opening</p>
						<div className='MorningWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.openingEvents.map((w, i) => (
								<StaffWorkshopCard
									workshop={w}
									key={i}
									confirmed={confirmedWorkshop}
									handleAdd={setNewWorkshop}
									workshops={newWorkshop}
								/>
							))}
						</div>
					</div>
					<div className='Noon'>
						<p className='text-2xl my-8 font-bold text-blue_dark'>Upcoming</p>
						<div className='NoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.upcomingEvents.map((w, i) => (
								<StaffWorkshopCard
									workshop={w}
									key={i}
									confirmed={confirmedWorkshop}
									handleAdd={setNewWorkshop}
									workshops={newWorkshop}
								/>
							))}
						</div>
					</div>
					<div className='Afternoon'>
						<p className='text-2xl my-8 font-bold text-blue_dark'>Completed</p>
						<div className='AfterNoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.completedEvents.map((w, i) => (
								<StaffWorkshopCard
									workshop={w}
									key={i}
									confirmed={confirmedWorkshop}
									handleAdd={setNewWorkshop}
									workshops={newWorkshop}
								/>
							))}
						</div>
					</div>
					<SelectedWorkshopBanner
						selectedWorkshops={newWorkshop}
						handleRemove={setNewWorkshop}
						isStaff={true}
						confirmed={confirmedWorkshop}
						uuid={UUID}
					/>
				</div>
			)}
		</div>
	);
};

const StaffWorkshopCard: FC<{
	workshop: WorkshopData;
	confirmed: number[];
	handleAdd: Dispatch<SetStateAction<WorkshopData[]>>;
	workshops: WorkshopData[];
}> = ({ workshop, confirmed, handleAdd, workshops }) => {
	const isConfirmed = confirmed.includes(workshop.id);

	const isSeatFull = workshop.remainingSeats <= 0;

	const workshopDate = parseWorkshopTimeToDateObject(workshop.startAt);
	const queueOpeningTime = new Date(
		workshopDate.getFullYear(),
		workshopDate.getMonth(),
		workshopDate.getDate() - 2,
		8,
		0
	);

	const isOpenQueue = new Date() >= queueOpeningTime;

	const handleSelect = () => {
		if (isConfirmed) return;

		if (!isOpenQueue) return;

		if (!isSeatFull) return;

		handleAdd((prev) => {
			if (prev.length > 0) return prev;
			if (prev.find((w) => w.id === workshop.id)) {
				return prev;
			}
			if (workshop.remainingSeats > 0) {
				return prev;
			}
			const haveTimeConflict = prev.some((selected) => {
				const selectedStart = parseWorkshopTimeToDateObject(selected.startAt);
				const selectedEnd = parseWorkshopTimeToDateObject(selected.endAt);
				const newStart = parseWorkshopTimeToDateObject(workshop.startAt);
				const newEnd = parseWorkshopTimeToDateObject(workshop.endAt);
				const isDDayExisted = selected.id === 31;
				const isWDday = workshop.id === 31;

				if (isDDayExisted || isWDday) return false;

				return (
					(newStart < selectedEnd && newStart >= selectedStart) ||
					(newEnd > selectedStart && newEnd < selectedEnd) ||
					(newStart < selectedStart && newEnd > selectedEnd)
				);
			});
			if (haveTimeConflict) {
				return prev;
			}
			return [...prev, workshop];
		});
	};

	return (
		<div
			className={`flex flex-row relative md:flex-col flex-shrink-0 cursor-pointer ${
				workshop.remainingSeats > 0 ? 'cursor-not-allowed opacity-30' : ''
			}`}
			onClick={handleSelect}
		>
			{isConfirmed && (
				<div className='w-full h-full absolute flex justify-center items-center bg-[#E5E7EBDD]'>
					<p className='font-bold text-xl'>ลงทะเบียนแล้ว</p>
				</div>
			)}
			{workshops.filter((w) => w === workshop && !confirmed.includes(w.id)).length > 0 && (
				<div className='w-full h-full absolute flex justify-center items-center bg-[#E5E7EBDD]'>
					<p className='font-bold text-xl'>กำลังเลือก</p>
				</div>
			)}
			<div className='w-72 md:w-full mr-2 md:m-0'>
				<Image
					src={workshop.imagepath!}
					alt={workshop.imagepath!}
					width={160}
					height={160}
					className='w-full object-cover rounded-lg md:w-full md:rounded-xl aspect-[3/4]'
					priority
				/>
			</div>
			<div className='w-full md:py-4'>
				<div className='mb-2'>
					<p className='md:text-lg font-semibold line-clamp-2'>{workshop.name}</p>
					<p className='text-gray-500 text-sm line-clamp-1'>
						{workshop.shortdescription}
					</p>
				</div>
				<div className='leading-5'>
					<p className='text-xs inline-flex items-center gap-1 text-blue_dark'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='1em'
							height='1em'
							viewBox='0 0 24 24'
						>
							<path
								fill='currentColor'
								d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4'
							></path>
						</svg>
						{workshop.remainingSeats <= 0
							? `${workshop.queueCount} คิว`
							: `ว่าง ${workshop.remainingSeats} จาก ${workshop.seats} ที่นั่ง`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default StaffWorkshopPage;
