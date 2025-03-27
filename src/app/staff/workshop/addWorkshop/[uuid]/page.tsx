'use client';
import { getWorkshopAPI, getWorkshopAPIData } from '@/api/workshop/getWorkshop';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Logo from '@/assets/images/mainLogo_yellow.png';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getConfirmedWorkshopAPI } from '@/api/staff/addWorkshopAPI';
import { SelectedWorkshopBanner } from '@/components/openhouse/selectedWorkshopBanner';
import { parseWorkshopTimeToDateObject } from '@/utils/parseTime';

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
		setNewWorkshop(dat.morningEvents.filter((w) => confirmedWorkshopResponse.includes(w.id)));
		setNewWorkshop((prev) => [
			...prev,
			...dat.noonEvents.filter((w) => confirmedWorkshopResponse.includes(w.id)),
		]);
		setNewWorkshop((prev) => [
			...prev,
			...dat.afterNoonEvents.filter((w) => confirmedWorkshopResponse.includes(w.id)),
		]);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchWorkshops();
	}, []);

	return (
		<div className='w-full max-w-screen-lg p-2 m-auto'>
			<div className='Banner bg-gradient p-6 py-10 rounded-2xl flex justify-between items-center md:p-10'>
				<Image
					src={Logo}
					alt='logo'
					className='LOGO object-contain h-10 w-fit md:h-14'
					priority
				/>
				<div>
					<p className='text-white text-end font-semibold md:leading-8 md:text-lg'>
						Staff Workshop <br />
						<span className='text-xl text-secondary font-bold md:text-3xl'>
							Walk-In Register
						</span>
					</p>
				</div>
			</div>
			{isLoading ? (
				<div className='h-full text-4xl font-bold flex items-center justify-center'>
					Loading
				</div>
			) : (
				<div className='w-full'>
					<div className='Morning'>
						<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงเช้า</p>
						<div className='MorningWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.morningEvents.map((w, i) => (
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
						<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงเที่ยง</p>
						<div className='NoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.noonEvents.map((w, i) => (
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
						<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงบ่าย</p>
						<div className='AfterNoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.afterNoonEvents.map((w, i) => (
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
	const currentDateTime = new Date();
	const workshopDateTime = parseWorkshopTimeToDateObject(workshop.startAt);
	const isToolate = currentDateTime > workshopDateTime;
	const isConfirmed = confirmed.includes(workshop.id);

	const handleSelect = () => {
		if (isToolate) return;
		if (isConfirmed) return;
		handleAdd((prev) => {
			if (prev.find((w) => w.id === workshop.id)) {
				return prev;
			}
			if (workshop.remainingSeats <= 0 || isToolate) {
				return prev;
			}
			const haveTimeConflict = prev.some((selected) => {
				const selectedStart = parseWorkshopTimeToDateObject(selected.startAt);
				const selectedEnd = parseWorkshopTimeToDateObject(selected.endAt);
				const newStart = parseWorkshopTimeToDateObject(workshop.startAt);
				const newEnd = parseWorkshopTimeToDateObject(workshop.endAt);
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
				workshop.remainingSeats <= 0 || isToolate ? 'cursor-not-allowed opacity-30' : ''
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
					layout='contain'
					width={160}
					height={160}
					className='w-full object-cover rounded-lg md:w-full md:rounded-xl md:aspect-video'
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
							? 'เต็ม'
							: `ว่าง ${workshop.remainingSeats} จาก ${workshop.seats} ที่นั่ง`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default StaffWorkshopPage;
