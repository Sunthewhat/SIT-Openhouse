'use client';
import { FC, useState } from 'react';
import Icon from '@/assets/images/workshop_banner.png';
import Image from 'next/image';
import { NewcomerModal } from '@/components/events/walk-in/newcomerModal';
import { RegisteredModal } from '@/components/events/walk-in/registeredModal';

const EventWalkinRegisterPage: FC = () => {
	const [isNewcomerOpen, setIsNewcomerOpen] = useState(false);
	const [isRegisteredOpen, setIsRegisteredOpen] = useState(false);
	return (
		<div className='w-full h-dvh grid xs:grid-rows-2 md:grid-cols-2'>
			<div className='Newcomer h-full w-full flex items-center justify-center'>
				<div
					className='font-bold text-2xl text-center flex flex-col items-center bg-blue_dark text-secondary w-3/4 md:w-4/6 py-10 rounded-3xl'
					onClick={() => setIsNewcomerOpen(true)}
				>
					<Image src={Icon} alt={Icon.src} width={160} height={160} />
					<h1>Newcomers</h1>
					<h1 className='text-xl font-semibold'>ผู้เข้าชมใหม่</h1>
				</div>
			</div>
			<div className='Registered h-full w-full flex items-center justify-center'>
				<div
					className='font-bold text-2xl text-center flex flex-col items-center bg-blue_dark text-secondary w-3/4 md:w-4/6 py-10 rounded-3xl'
					onClick={() => setIsRegisteredOpen(true)}
				>
					<Image src={Icon} alt={Icon.src} width={160} height={160} />
					<h1>Registered Guests</h1>
					<h1 className='text-xl font-semibold'>ผู้เข้าชมที่ลงทะเบียนแล้ว</h1>
				</div>
			</div>
			<NewcomerModal isVisible={isNewcomerOpen} onClose={() => setIsNewcomerOpen(false)} />
			<RegisteredModal
				isVisible={isRegisteredOpen}
				onClose={() => setIsRegisteredOpen(false)}
			/>
		</div>
	);
};

export default EventWalkinRegisterPage;
