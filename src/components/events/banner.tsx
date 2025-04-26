import { FC } from 'react';
import yellowLogo from '@/assets/images/mainLogo_yellow.png';
import workshopBannerImg from '@/assets/images/workshop_banner.png';
import Image from 'next/image';

const OpenhouseBanner: FC = () => {
	return (
		<div className='Banner relative max-w-screen-xl w-full m-auto bg-gradient rounded-2xl px-6 md:px-10 py-12 flex items-center justify-between text-white overflow-clip'>
			<div className='z-10'>
				<div className='mb-8'>
					<Image src={yellowLogo} alt='yellowLogo' className='w-[150px]' />
				</div>
				<p className='font-semibold text-sm md:text-xl mb-2 '>
					ลงทะเบียน workshop และกิจกรรมภายในงาน
				</p>
				<p className='text-[#FCD34D] font-extrabold text-2xl md:text-3xl mb-2'>
					SIT OPEN HOUSE 2024
				</p>
				<div className='mt-4'>
					<p className='flex font-semibold mb-2'>
						<span className='mt-1 mr-1'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='1em'
								height='1em'
								viewBox='0 0 24 24'
							>
								<path
									fill='currentColor'
									d='M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V8h16z'
								></path>
							</svg>
						</span>
						11 พฤศจิกายน 2567 นี้
					</p>
					<p className='flex'>
						<span className='mt-1 mr-1'>
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
						อาคารการเรียนรู้พหุวิทยาการ (LX)
						<br />
						คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
					</p>
				</div>
			</div>
			<Image
				src={workshopBannerImg}
				alt='workshopBannerImg'
				className='w-[32rem] absolute opacity-20 -bottom-40 lg:opacity-50 sm:right-8'
			/>
		</div>
	);
};

export { OpenhouseBanner };
