'use client';
import { getWorkshopAPI, getWorkshopAPIData } from '@/api/workshop/getWorkshop';
// import { OpenhouseBanner } from '@/components/openhouse/banner';
import { SelectedWorkshopBanner } from '@/components/openhouse/selectedWorkshopBanner';
import { WorkshopCard, WorkshopCardPlaceholder } from '@/components/openhouse/workshopCard';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { FC, useEffect, useState } from 'react';
import { PDPAModal } from '@/components/openhouse/PDPAModal';
import { workshopCookieHandler } from '@/utils/workshop-cookie-hander';
import ImageSlideshow from '@/components/openhouse/imageSlide';

import IMGEX1 from '@/assets/images/EX.png';
import IMGEX2 from '@/assets/images/mock_image.png';
import IMGEX3 from '@/assets/images/mainLogo_color.png';

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
			src: IMGEX1.src,
			alt: '',
		},
		{
			src: IMGEX2.src,
			alt: '',
		},
		{
			src: IMGEX3.src,
			alt: '',
		},
	];

	return (
		<div className='page w-full'>
			{/* <OpenhouseBanner /> */}
			<ImageSlideshow images={exampleImages} autoplaySpeed={10000} />
			<div className='mainBox max-w-screen-lg m-auto p-5'>
				<div className='Opening'>
					<p className='text-2xl my-2 md:my-8 font-bold text-blue_dark'>
						กิจกรรมที่เปิดรับสมัคร
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
