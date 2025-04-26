'use client';

import { staffCookieHandler } from '@/utils/staff-cookie-handler';
// import { RegisterFooter } from '../../components/footer';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { VerifyAPI } from '@/api/staff/verify';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const path = usePathname();
	const navigator = useRouter();
	const verify = async () => {
		const res = await VerifyAPI();
		if (!res) {
			navigator.replace('/staff/login');
		}
	};
	useEffect(() => {
		if (path.split('/').find((p) => p === 'login') !== undefined) {
			return;
		}
		if (!staffCookieHandler.isCredExist()) {
			navigator.replace('/staff/login');
		}
		verify();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigator, path]);
	return (
		<div className='register-layout flex flex-col min-h-screen bg-[#E5E7EB]'>
			<div className='children_container flex flex-grow items-start m-auto w-full'>
				{children}
			</div>
			{/* {path.split('/').find((p) => p === 'login') === undefined && <RegisterFooter />} */}
		</div>
	);
}
