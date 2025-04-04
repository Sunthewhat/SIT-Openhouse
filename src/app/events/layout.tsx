import { Header } from '@/components/header';
import { RegisterFooter } from '../../components/footer';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='register-layout flex flex-col min-h-screen bg-[#E5E7EB]'>
			<Header />
			<div className='children_container flex flex-grow items-start m-auto w-full'>
				{children}
			</div>
			<RegisterFooter />
		</div>
	);
}
