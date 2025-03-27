import { RegisterFooter } from '../../../components/footer';
import { RegisterHeader } from '../../../components/ICT-register/register-header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='register-layout flex flex-col min-h-screen'>
      <RegisterHeader />
      <div className='children_container flex flex-grow items-start m-auto lg:-mt-32 -mt-40 mb-10 lg:w-1/2 md:w-2/3 w-11/12'>
        {children}
      </div>
      <RegisterFooter />
    </div>
  );
}
