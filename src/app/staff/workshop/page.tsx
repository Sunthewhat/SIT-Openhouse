'use client';
import { getWorkshopAPI, getWorkshopAPIData } from '@/api/workshop/getWorkshop';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { FC, useEffect, useState } from 'react';
import Logo from '@/assets/images/mainLogo_yellow.png';
import Image from 'next/image';

const StaffWorkshopMonitorPage: FC = () => {
	const [workshops, setWorkshops] = useState<getWorkshopAPIData>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchWorkshops = async () => {
		const dat = await getWorkshopAPI();
		setWorkshops(dat);
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
							Monitor Page
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
								<StaffWorkshopCard workshop={w} key={i} />
							))}
						</div>
					</div>
					<div className='Noon'>
						<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงเที่ยง</p>
						<div className='NoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.noonEvents.map((w, i) => (
								<StaffWorkshopCard workshop={w} key={i} />
							))}
						</div>
					</div>
					<div className='Afternoon'>
						<p className='text-2xl my-8 font-bold text-blue_dark'>ช่วงบ่าย</p>
						<div className='AfterNoonWorkshop flex flex-col gap-2 mb-12 md:gap-y-8 md:grid md:grid-cols-4'>
							{workshops?.afterNoonEvents.map((w, i) => (
								<StaffWorkshopCard workshop={w} key={i} />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const StaffWorkshopCard: FC<{
	workshop: WorkshopData;
}> = ({ workshop }) => {
	return (
		<div
			className={`flex flex-row relative md:flex-col flex-shrink-0 cursor-pointer ${
				workshop.remainingSeats <= 0 ? 'cursor-not-allowed opacity-30' : ''
			}`}
		>
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

export default StaffWorkshopMonitorPage;
