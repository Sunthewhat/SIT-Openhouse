'use client';
import { useRouter } from 'next/navigation';

const RegisterLandingPage = () => {
  const navigator = useRouter();
  const handleAcceptToPDPA = () => {
    navigator.push('/ict-challenge/register/PDPA');
  };
  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='relative flex flex-col justify-center items-center p-8 border bg-white shadow-lg rounded-[12px] w-full'>
          <div className='h-full w-full'>
            <p className=' leading-relaxed text-[#1C3FB7] mb-2 text-[20px] md:text-[30px] lg:text-[30px] font-bold text-center'>
              กลับมาอีกครั้งกับการแข่งขันตอบปัญหาวิชาการคอมพิวเตอร์ และเทคโนโลยีสารสนเทศ ICT
              Challenges 2024
            </p>
            <p className='text-lg leading-relaxed text-[#637381] mb-2 text-[20px] '>
              จุดประกาย ท้าทายความสามารถค้นหาความเป็นไอทีในตัวคุณ รวมทีม 3 คน สมัครเข้าร่วมแข่งกัน
              ICT Challenge 2024 ชิงทุนการศึกษามูลค่ารวมกว่า 30,000 บาท
              และรับเกียรติบัตรการเข้าร่วมแข่งขัน
            </p>
            <br />
            <p className='text-lg leading-relaxed text-[#637381] text-[15px]'>
              คัดเลือกทีมที่จะมีสิทธิ์เข้าแข่งขันรอบคัดเลือกเพียง 80 ทีมเท่านั้นและคัดเลือกให้เหลือ
              10 ทีมในรอบชิงชนะเลิศ
            </p>
            <br />
            <p className='text-lg leading-relaxed text-[#637381] text-[15px] font-bold'>
              โดยมีกลุ่มความรู้ที่ใช้ในการแข่งขันมีดังนี้:
            </p>

            <ol className='list-decimal list-inside text-lg leading-relaxed text-[#637381] text-[15px]'>
              <li>กลุ่มเทคโนโลยีเครือข่าย และระบบปฏิบัติการ</li>
              <li>กลุ่มการเขียนโปรแกรม และอัลกอริทึม</li>
              <li>กลุ่ม Hardware/Infrastructure/Cloud Computing</li>
              <li>กลุ่ม Smart System and Artificial Intelligence</li>
            </ol>
            <br />
            <p className='text-lg leading-relaxed text-[#637381] text-[15px] font-bold'>
              สมัครได้ตั้งแต่วันนี้ - 3 พฤศจิกายน 2567
            </p>
            <br />

            <p className='text-lg leading-relaxed text-[#637381] text-[15px] font-bold'>
              สามารถติดต่อสอบถามได้ที่:
            </p>
            <ul className='list-none text-lg leading-relaxed text-[#637381] text-[15px]'>
              <li>
                Website:{' '}
                <a href='https://sitevent.sit.kmutt.ac.th' className='text-[#1C3FB7]'>
                  https://sitevent.sit.kmutt.ac.th
                </a>
              </li>
              <li>
                Instagram:{' '}
                <a href='https://www.instagram.com/sit.family/' className='text-[#1C3FB7]'>
                  SIT.Family
                </a>
              </li>
              <li>
                Facebook:{' '}
                <a href='https://www.facebook.com/SIT.Family' className='text-[#1C3FB7]'>
                  SIT.Family
                </a>
              </li>
              <li>
                Line:{' '}
                <a href='https://page.line.me/olt5471s' className='text-[#1C3FB7]'>
                  @SIT.KMUTT
                </a>
              </li>
              <li>Tel: 024709882</li>
            </ul>
            <br />
            <div className='flex-col flex items-start  underline underline-offset-[3px] decoration-[#1C3FB7]'>
              <div className='flex gap-[5px] items-center'>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z'
                    fill='#1C3FB7'
                  />
                </svg>

                <button>
                  <a
                    href='https://sitevent-api.sit.kmutt.ac.th/resources/ICT2024_RulesRegulation.pdf'
                    className='text-[#1C3FB7]'
                  >
                    download เอกสารกติกาการแข่งขัน
                  </a>
                </button>
              </div>
              <div className='flex gap-[5px] items-center'>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z'
                    fill='#1C3FB7'
                  />
                </svg>

                <button>
                  <a
                    href='https://sitevent-api.sit.kmutt.ac.th/resources/ICT2024_LeaveRequest.pdf'
                    className='text-[#1C3FB7]'
                  >
                    download เอกสารขอเชิญชวนเข้าแข่งขัน
                  </a>
                </button>
              </div>
            </div>
            <div className='flex justify-end  gap-10'>
              <button
                onClick={handleAcceptToPDPA}
                className='bg-[#1C3FB7] text-white px-4 py-2 rounded-[8px] hover:bg-[#0D2A8D] w-[156px] md:w-[235px] lg:w-[235px] h-[50px] text-[13px] md:text-[15px] lg:text-[15px] mt-5'
              >
                สมัครเข้าร่วมแข่งขัน <span className='ml-2'>&gt;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLandingPage;
