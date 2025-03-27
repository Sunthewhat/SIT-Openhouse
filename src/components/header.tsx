'use client';
import { FC } from 'react';
import SIT_Logo from '@/assets/svg/SIT_logo.svg';
import SITEVENT_Logo from '@/assets/svg/SITEVENT_logo.svg';
import Image from 'next/image';

const Header: FC = () => {
	return (
		<div className='flex gap-3 bg-black p-4 h-20 items-center'>
			<Image src={SITEVENT_Logo} alt='' className='h-10' />
			<div className='h-3/4 w-[0.5px] bg-white' />
			<Image src={SIT_Logo} alt='' className='h-10' />
		</div>
	);
};
export { Header };
