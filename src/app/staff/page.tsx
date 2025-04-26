'use client';

import { FC } from 'react';
import WorkshopLogo from '@/assets/images/workshop_banner.png';
import ICTLogo from '@/assets/images/ictLogo.png';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { StaffBanner } from '@/components/staff/staffBanner';

type StaffActivityType = {
	name: string;
	description: string;
	image: StaticImageData;
	path_to_redirect: string;
};

const StaffActivity: StaffActivityType[] = [
	{
		name: 'Workshop Check-in',
		description: 'ลงทะเบียนเข้าร่วม Workshop ต่างๆ',
		image: WorkshopLogo,
		path_to_redirect: '/staff/workshop/checkin',
	},
	{
		name: 'Add Workshop',
		description: 'เพิ่ม Workshop ใหม่',
		image: WorkshopLogo,
		path_to_redirect: '/staff/workshop/addWorkshop',
	},
	{
		name: 'ICT Challenge Check-in',
		description: 'ลงทะเบียนเข้าร่วม ICT Challenge',
		image: ICTLogo,
		path_to_redirect: '/staff/ict-challenge/checkin',
	},
	{
		name: 'Workshop Monitor',
		description: 'ตรวจสอบ Workshop',
		image: WorkshopLogo,
		path_to_redirect: '/staff/workshop',
	},
];

const StaffPage: FC = () => {
	const navigator = useRouter();
	return (
		<div className='w-full max-w-screen-lg mx-auto p-2'>
			<StaffBanner primary='Welcome to' secondary='Staff Space!' />
			<div className='w-full grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-2'>
				{StaffActivity.map((activity, index) => (
					<div
						key={index}
						className='cursor-pointer'
						onClick={() => navigator.push(activity.path_to_redirect)}
					>
						<div className='bg-white rounded-2xl p-4 shadow-sm duration-200 md:px-4 md:py-8 hover:bg-gray-100'>
							<Image
								src={activity.image}
								alt={activity.image.src}
								className='object-contain h-24 w-full'
							/>
							<p className='text-[#1C3FB7] font-bold lg:text-xl text-center mt-3'>
								{activity.name}
							</p>
							<p className='text-[#637381] lg:text-base text-sm text-center mt-1'>
								{activity.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default StaffPage;
