import { FC } from 'react';
import Image from 'next/image';
import Logo from '@/assets/svg/SIT_logo.svg';

type StaffBannerProps = {
	primary: string;
	secondary: string;
};

const StaffBanner: FC<StaffBannerProps> = ({ primary, secondary }) => {
	return (
		<div className='Banner bg-gradient p-6 py-10 mb-2 rounded-2xl flex justify-between items-center md:p-10'>
			<Image
				src={Logo}
				alt='logo'
				className='LOGO object-contain h-10 w-fit md:h-14'
				priority
			/>
			<div>
				<p className='text-white text-end font-semibold md:leading-8 md:text-lg'>
					{primary} <br />
					<span className='text-xl text-secondary font-bold md:text-3xl'>
						{secondary}
					</span>
				</p>
			</div>
		</div>
	);
};

export { StaffBanner };
