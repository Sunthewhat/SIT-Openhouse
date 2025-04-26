'use client';
import { getWorkshopAPI, getWorkshopAPIData } from '@/api/workshop/getWorkshop';
import { SelectedWorkshopBanner } from '@/components/events/selectedWorkshopBanner';
import { WorkshopCard, WorkshopCardPlaceholder } from '@/components/events/workshopCard';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { FC, useEffect, useState } from 'react';
import { PDPAModal } from '@/components/events/PDPAModal';
import { workshopCookieHandler } from '@/utils/workshop-cookie-hander';
import ImageSlideshow from '@/components/events/imageSlide';

const OpenhouseWorkshopPage: FC = () => {
	const [workshops, setWorkshops] = useState<getWorkshopAPIData | null>(null);
	const [selectedWorkshops, setSelectedWorkshops] = useState<WorkshopData[]>([]);
	const [isPDPAAccepted, setIsPDPAAccepted] = useState(true);
	const fetchWorkshop = async () => {
		const res = await getWorkshopAPI();
		setWorkshops(res);
	};

	const getPDPAValue = () => {
		const pdpa: boolean = workshopCookieHandler.getPDPA();
		setIsPDPAAccepted(pdpa);
	};
	useEffect(() => {
		fetchWorkshop();
		getPDPAValue();
	}, []);

	const exampleImages = [
		{
			src: 'https://sitevent-api.sit.kmutt.ac.th/resources/2025/Banner_1.png',
			alt: '',
		},
		{
			src: 'https://sitevent-api.sit.kmutt.ac.th/resources/2025/Banner_2.png',
			alt: '',
		},
		{
			src: 'https://sitevent-api.sit.kmutt.ac.th/resources/2025/Banner_3.png',
			alt: '',
		},
	];

	return (
		<div className='page w-full'>
			<ImageSlideshow images={exampleImages} autoplaySpeed={10000} />
			<div className='mainBox max-w-screen-lg m-auto p-5'>
				<div className='Opening'>
					<p className='text-2xl my-1 md:my-4 font-bold text-blue_dark'>
						กิจกรรมที่เปิดรับสมัคร
					</p>
					<p className='text-md my-1 md:my-4 text-gray-600'>
						โปรดเลือกกิจกรรมที่ท่านสนใจให้ครบถ้วน ก่อนดำเนินการยืนยัน
					</p>
					<p className='text-md my-1 md:my-4 text-gray-600'>
						การจองคิวจะสามารถจองได้ครั้งละ 1 กิจกรรมเท่านั้น
					</p>
					<div className='OpeningEvents gap-x-2 mb-12 gap-y-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
						{workshops === null || workshops.openingEvents.length === 0 ? (
							<WorkshopCardPlaceholder
								status={workshops === null ? 'Loading' : 'Coming Soon'}
							/>
						) : (
							workshops.openingEvents.map((w, i) => (
								<WorkshopCard
									key={i}
									workshop={w}
									handleSelect={setSelectedWorkshops}
									selectedWorkshop={selectedWorkshops}
								/>
							))
						)}
					</div>
				</div>
				<div className='Upcoming pt-5'>
					<p className='text-2xl my-8 font-bold text-blue_dark'>เร็วๆนี้</p>
					<div className='NoonWorkshop mb-12 gap-y-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
						{workshops === null || workshops.upcomingEvents.length === 0 ? (
							<WorkshopCardPlaceholder
								status={workshops === null ? 'Loading' : 'Coming Soon'}
							/>
						) : (
							workshops.upcomingEvents.map((w, i) => (
								<WorkshopCard
									key={i}
									workshop={w}
									handleSelect={setSelectedWorkshops}
									selectedWorkshop={selectedWorkshops}
								/>
							))
						)}
					</div>
				</div>
				{workshops && workshops.completedEvents.length > 0 && (
					<div className='Ended pt-5'>
						<p className='text-2xl my-8 font-bold text-blue_dark'>ผ่านมาแล้ว</p>
						<div className='NoonWorkshop mb-12 gap-y-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
							{workshops === null || workshops.completedEvents.length === 0 ? (
								<WorkshopCardPlaceholder
									status={workshops === null ? 'Loading' : 'Coming Soon'}
								/>
							) : (
								workshops.completedEvents.map((w, i) => (
									<WorkshopCard
										key={i}
										workshop={w}
										handleSelect={setSelectedWorkshops}
										selectedWorkshop={selectedWorkshops}
									/>
								))
							)}
						</div>
					</div>
				)}
				<SelectedWorkshopBanner
					selectedWorkshops={selectedWorkshops}
					handleRemove={setSelectedWorkshops}
				/>
			</div>
			<PDPAModal isAccepted={isPDPAAccepted} setIsAccepted={setIsPDPAAccepted} />
		</div>
	);
};

export default OpenhouseWorkshopPage;
