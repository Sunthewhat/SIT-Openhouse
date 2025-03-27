import Image from 'next/image';
import { FC } from 'react';
import logoH from '@/assets/images/ictLogo.png';

const RegisterHeader: FC = () => {
  return (
    <div className='register-header -z-10 w-full lg:h-96 h-96 bg-[linear-gradient(-45deg,#0B5796,#001678,_#2AA4E6)] flex justify-center text-white'>
      <div className='flex flex-col items-center mt-[20px] px-4 md:mt-[40px] lg:mt-[45px]'>
        <Image
          src={logoH}
          alt='logoHeader'
          className='mx-auto w-[120px] sm:w-[150px] h-auto+'
          width={120}
          height={120}
        />
        <div className='font-bold text-lg sm:text-[20px] mt-2'>
          แบบฟอร์มลงทะเบียน ICT Challenge 2024
        </div>
        <div className='text-center text-sm sm:text-[16px] mt-2 px-2'>
          การแข่งขันตอบปัญหาวิชาการคอมพิวเตอร์ และเทคโนโลยีสารสนเทศ (ประเภททีม) ชิงทุนการศึกษากว่า
          30,000 บาท พร้อมรับเกียรติบัตร
        </div>
      </div>
    </div>
  );
};

export { RegisterHeader };
