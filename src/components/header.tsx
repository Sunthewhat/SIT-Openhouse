'use client';
import { FC } from 'react';
import SIT_Logo from '@/assets/svg/SIT_logo.svg';
import SITEVENT_Logo from '@/assets/svg/SITEVENT_logo.svg';
import Image from 'next/image';

const Header: FC = () => {
	return (
		<div className='flex gap-3 bg-black p-6 h-10 md:h-20 items-center'>
			<Image src={SITEVENT_Logo} alt='' className='h-5 md:h-10 w-fit' />
			<div className='h-5 md:h-3/4 w-[1px] bg-white' />
			<Image src={SIT_Logo} alt='' className='h-5 md:h-10 w-fit' />
		</div>
	);
};
export { Header };
