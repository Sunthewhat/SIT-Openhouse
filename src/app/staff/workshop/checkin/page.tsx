'use client';

import { getWorkshopAPI, getWorkshopAPIData } from '@/api/workshop/getWorkshop';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { parseWorkshopTime, parseWorkshopTimeToDateObject } from '@/utils/parseTime';
import Logo from '@/assets/images/mainLogo_yellow.png';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const WorkshopCheckInPage: FC = () => {
	const navigator = useRouter();
	const currentPath = usePathname();
	const [workshops, setWorkshops] = useState<getWorkshopAPIData>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleNavigate = (id: number) => {
		navigator.push(`${currentPath}/${id}`);
	};
	const fetchWorkshops = async () => {
		const data = await getWorkshopAPI();
		setWorkshops(data);
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
						Walk-In Register
						<br />
						<span className='text-xl text-secondary font-bold md:text-3xl'>
							Select workshop
						</span>
					</p>
				</div>
			</div>
			{isLoading ? (
				<div className='text-center text-4xl font-bold border-gray-400 border-[1px] rounded-2xl h-64 flex items-center justify-center'>
					<p>Loading...</p>
				</div>
			) : (
				<>
					<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงเช้า</p>
					<div className='MorningWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
						{workshops?.morningEvents.map((workshop, index) => (
							<WorkshopCard
								key={index}
								workshop={workshop}
								handleClick={handleNavigate}
							/>
						))}
					</div>
					<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงเที่ยง</p>
					<div className='NoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
						{workshops?.noonEvents.map((workshop, index) => (
							<WorkshopCard
								key={index}
								workshop={workshop}
								handleClick={handleNavigate}
							/>
						))}
					</div>
					<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงบ่าย</p>
					<div className='AfterNoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
						{workshops?.afterNoonEvents.map((workshop, index) => (
							<WorkshopCard
								key={index}
								workshop={workshop}
								handleClick={handleNavigate}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

const WorkshopCard: FC<{ workshop: WorkshopData; handleClick: (id: number) => void }> = ({
	workshop,
	handleClick,
}) => {
	const workshopTime = parseWorkshopTimeToDateObject(workshop.startAt);
	const currentTime = new Date();
	// Before workshop start 30 mins and after workshop start 15 mins
	const isTooEarly = currentTime.getTime() < workshopTime.getTime() - 30 * 60 * 1000;
	const isTooLate = currentTime.getTime() > workshopTime.getTime() + 15 * 60 * 1000;

	const handleNavigate = () => {
		if (isTooEarly || isTooLate) return;
		handleClick(workshop.id);
	};

	return (
		<div
			className={`flex relative flex-row md:flex-col flex-shrink-0 cursor-pointer ${
				isTooEarly || isTooLate ? 'cursor-not-allowed' : ''
			}`}
			onClick={handleNavigate}
		>
			{isTooEarly || isTooLate ? (
				<div className='absolute h-full w-full flex md:flex-col p-4 items-center md:justify-around text-center bg-[#E5E7EBCC] rounded-xl top-0 left-0 cursor-default'>
					<p>{isTooEarly ? 'ยังไม่เปิดให้ลงทะเบียน' : 'หมดเวลาลงทะเบียน'}</p>
					<div />
				</div>
			) : null}
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
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='1em'
								height='1em'
								viewBox='0 0 24 24'
							>
								<path
									fill='currentColor'
									d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5'
								></path>
							</svg>
						</span>
						{workshop.vanue}
					</p>
					<br />
					<p className='text-xs inline-flex items-center gap-1 text-blue_dark'>
						<span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='1em'
								height='1em'
								viewBox='0 0 24 24'
							>
								<path
									fill='currentColor'
									d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z'
								></path>
							</svg>
						</span>
						{parseWorkshopTime(workshop.startAt).time} -{' '}
						{parseWorkshopTime(workshop.endAt).time} น.
					</p>
					<br />
					<p className='text-xs inline-flex items-center gap-1 text-blue_dark'>
						{`${workshop.attendCount} คน Check In แล้ว จาก ${workshop.reserved} คน`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default WorkshopCheckInPage;
