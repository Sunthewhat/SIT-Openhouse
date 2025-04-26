'use client';

import { StaffBanner } from '@/components/staff/staffBanner';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { QrReader, OnResultFunction } from 'react-qr-reader';

const AddWorkshopPage: FC = () => {
	const [isOpenCamera, setIsOpenCamera] = useState<boolean>(false);
	const navigator = useRouter();
	const path = usePathname();

	const QrCodeReader: FC = () => {
		const onReadResult: OnResultFunction = (result, e) => {
			if (e) {
				return;
			}
			if (!result) return;
			const resultText = result.getText();

			navigator.push(`${path}/${resultText}`);
		};

		return (
			<QrReader
				onResult={onReadResult}
				constraints={{ facingMode: 'environment' }}
				videoContainerStyle={{ width: '500px', height: '375px' }}
				videoStyle={{ width: '500px', height: '375px' }}
				containerStyle={{ width: '500px', height: '375px' }}
			/>
		);
	};
	return (
		<div className='flex flex-col w-full items-center'>
			<div className='p-2 flex flex-col items-center w-full max-w-screen-sm'>
				<div className='w-full flex flex-col gap-2'>
					<StaffBanner primary='Add New Workshop' secondary='Scan QR' />
					<div className='w-full bg-gray-300 overflow-clip flex flex-col items-center rounded-xl'>
						{isOpenCamera ? (
							<QrCodeReader />
						) : (
							<div className='w-full h-96 flex items-center justify-center text-gray-400'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='4em'
									height='4em'
									viewBox='0 0 24 24'
								>
									<circle cx='12' cy='12' r='3.2' fill='currentColor'></circle>
									<path
										fill='currentColor'
										d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5'
									></path>
								</svg>
							</div>
						)}
					</div>
					<div className='flex justify-center'>
						<button
							className={`${
								isOpenCamera ? 'bg-gray-400' : 'bg-gradient'
							} w-full text-white font-semibold text-2xl text-center rounded-xl p-6`}
							onClick={() => {
								setIsOpenCamera((p) => !p);
							}}
						>
							<p>{isOpenCamera ? 'Stop' : 'Scan QR Code to Verify'}</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddWorkshopPage;
