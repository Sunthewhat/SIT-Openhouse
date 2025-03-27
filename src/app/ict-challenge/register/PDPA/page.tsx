'use client';
import { registerCookieHandler } from '@/utils/register-cookie-handler';
import { useRouter } from 'next/navigation';

const PDAPPage = () => {
  const navigator = useRouter();
  const handleAcceptTolandingPDPA = () => {
    navigator.push('/ict-challenge/register/');
  };
  const handleAcceptPDPA = () => {
    registerCookieHandler.setPDPA(true);
    navigator.push('/ict-challenge/register/team');
  };
  return (
    <div className='flex flex-col justify-center items-center p-8 bg-white shadow-lg rounded-[12px] w-full'>
      <div className=' h-full w-full'>
        <p className='text-lg leading-relaxed text-[#1C3FB7] mb-2 text-[20px] font-bold '>
          หนังสือยินยอมเพื่อขอใช้ประโยชน์ข้อมูลส่วนบุคคล
        </p>
        <p className='text-lg leading-relaxed text-gray-700 text-[15px]'>
          <span className='pl-6'>คณะ</span>เทคโนโลยีสารสนเทศ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
          ให้ความสำคัญด้านการเคารพสิทธิในความเป็นส่วนตัว
          และการรักษาความปลอดภัยของข้อมูลส่วนบุคคลของท่าน โดยคณะฯ ได้กำหนดนโยบาย ระเบียบ
          และหลักเกณฑ์ต่าง ๆ ในการดำเนินงาน ของคณะ ฯ เพื่อให้เป็นไปตามมาตรฐาน
          ในการรักษาความปลอดภัยของข้อมูลส่วนบุคคล เพื่อให้ท่านได้มั่นใจว่า
          ข้อมูลส่วนบุคคลของท่านที่คณะ ฯ ได้รับจะถูกนำไปใช้ ตรงตามความต้องการของท่าน
          และถูกต้องตามกฎหมาย โดยคณะ ฯ จะจัดเก็บข้อมูลส่วนบุคคลของท่านตลอดระยะเวลา ที่จำเป็น
          ในการดำเนินการตามวัตถุประสงค์ของคณะ ฯ รวมถึงงานต่าง ๆ ที่จำเป็น <br />
          <span className='pl-6'>ทาง</span>คณะ ฯ เก็บ รวบรวมและใช้ข้อมูลส่วนบุคคลของท่าน
          รวมทั้งภาพถ่าย และวีดีโอ ที่เกิดจากการเข้าร่วมกิจกรรมของท่าน ซึ่งจัดโดยมหาวิทยาลัย คณะ ฯ
          และ/หรือนักศึกษา เพื่อวัตถุประสงค์ของคณะฯ ตลอดจนตามวัตถุประสงค์ดังต่อไปนี้
        </p>

        <ol className='list-decimal list-inside text-lg leading-relaxed text-gray-700 text-[15px]'>
          <li>
            เพื่อประโยชน์ทางการศึกษา การวิเคราะห์ ประมวลผล จัดทำสถิติ รวมไปถึงการจัดบริการต่าง ๆ
            เช่น การแนะแนว การสมัครงาน การพัฒนาทักษะด้านต่าง ๆ
          </li>
          <li>
            เพื่อจัดทำสื่อโฆษณา การเผยแพร่การประชาสัมพันธ์ต่อสาธารณะ ผ่านช่องทางสื่ออิเล็กทรอนิกส์
            สื่อออนไลน์ สื่อวิดีโอ สื่อสิ่งพิมพ์ต่าง ๆ เช่น เว็บไซต์ Social Media การติดประกาศ
            และช่องทางอื่น ๆ
          </li>
          <li>
            เพื่อใช้ข้อมูลของท่านในการแจ้งข้อมูลข่าวสาร การเรียนการสอน บริการของคณะ ฯ
            และการโฆษณาประชาสัมพันธ์ เช่น การเปิดรับสมัครนักศึกษาใหม่ การอบรม
            หรือกิจกรรมที่เกี่ยวข้อง
          </li>
          <li>วัตถุประสงค์อื่น ๆ เพื่อประโยชน์ของคณะฯ และ/หรือมหาวิทยาลัย และ/หรือนักศึกษา</li>
        </ol>
        <p className='text-lg leading-relaxed text-gray-700 mb-4 text-[15px]'>
          <span className='pl-6'>ทั้ง</span>นี้ ท่านมีสิทธิที่จะถอนความยินยอมหรือขอให้คณะ ฯ
          ลบข้อมูลเมื่อใดก็ได้ตลอดระยะเวลาที่ข้อมูลส่วนบุคคลของท่านอยู่กับคณะ ฯ
          อย่างไรก็ตามการถอนความยินยอมของท่านอาจส่งผลกระทบต่อท่านจากการใช้บริการต่าง ๆ เช่น
          ท่านจะไม่ได้รับสิทธิประโยชน์ที่ทางคณะ ฯ ให้บริการอยู่
          หรือไม่ได้รับข้อมูลข่าวสารอันเป็นประโยชน์แก่ท่าน เป็นต้น
          ดังนั้นเพื่อประโยชน์ของท่านจึงควรศึกษาและสอบถามถึงผลกระทบ ก่อนเพิกถอนความยินยอมดังกล่าว
          กรณีที่ท่านต้องการถอนความยินยอมกรุณาติดต่อผ่านอีเมล info@sit.kmutt.ac.th
        </p>
        <div className='flex  justify-between gap-10'>
          <button
            onClick={handleAcceptTolandingPDPA}
            className=' px-4 py-2 h-[50px] w-[146px]  mt-3 rounded-[8px]  bg-[#9CA3AF] hover:bg-[#6B7280] text-white text-[13px] md:text-[15px] lg:text-[15px]'
          >
            <span className='mr-2'>&lt;</span> ย้อนกลับ
          </button>
          <button
            onClick={handleAcceptPDPA}
            className='bg-[#1C3FB7] text-white px-4 py-2 rounded-[8px] hover:bg-[#0D2A8D] w-[146px] md:w-[235px] lg:w-[235px] h-[50px] text-[13px] md:text-[15px] lg:text-[15px] mt-3 '
          >
            รับทราบและดำเนินการต่อ<span className='ml-2'>&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDAPPage;
