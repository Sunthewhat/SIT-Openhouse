const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex flex-col items-center text-center flex-1'>
        <div
          className={`flex justify-center items-center w-[30px] h-[30px] rounded-full text-sm mb-2 ${currentStep >= 1 ? 'bg-[#1C3FB7] border-[#1C3FB7] text-white' : 'bg-gray-200 border-gray-300 text-gray-800'} border-2`}
        >
          {currentStep > 1 ? <span>&#10003;</span> : <span>1</span>}
        </div>
      </div>
      <div className={`w-full h-[2px] ${currentStep > 1 ? 'bg-[#1C3FB7]' : 'bg-gray-300'}`}></div>

      <div className='flex flex-col items-center text-center flex-1'>
        <div
          className={`flex justify-center items-center w-[30px] h-[30px] rounded-full text-sm mb-2 ${currentStep >= 2 ? 'bg-[#1C3FB7] border-[#1C3FB7] text-white' : 'bg-gray-200 border-gray-300 text-gray-800'} border-2`}
        >
          {currentStep > 2 ? <span>&#10003;</span> : <span>2</span>}
        </div>
      </div>
      <div className={`w-full h-[2px] ${currentStep > 2 ? 'bg-[#1C3FB7]' : 'bg-gray-300'}`}></div>

      <div className='flex flex-col items-center text-center flex-1'>
        <div
          className={`flex justify-center items-center w-[30px] h-[30px] rounded-full text-sm mb-2 ${currentStep >= 3 ? 'bg-[#1C3FB7] border-[#1C3FB7] text-white' : 'bg-gray-200 border-gray-300 text-gray-800'} border-2`}
        >
          {currentStep > 3 ? <span>&#10003;</span> : <span>3</span>}
        </div>
      </div>
      <div className={`w-full h-[2px] ${currentStep > 3 ? 'bg-[#1C3FB7]' : 'bg-gray-300'}`}></div>

      <div className='flex flex-col items-center text-center flex-1'>
        <div
          className={`flex justify-center items-center w-[30px] h-[30px] rounded-full text-sm mb-2 ${currentStep >= 4 ? 'bg-[#1C3FB7] border-[#1C3FB7] text-white' : 'bg-gray-200 border-gray-300 text-gray-800'} border-2`}
        >
          {currentStep > 4 ? <span>&#10003;</span> : <span>4</span>}
        </div>
      </div>
      <div className={`w-full h-[2px] ${currentStep > 4 ? 'bg-[#1C3FB7]' : 'bg-gray-300'}`}></div>

      <div className='flex flex-col items-center text-center flex-1'>
        <div
          className={`flex justify-center items-center w-[30px] h-[30px] rounded-full text-sm mb-2 ${currentStep >= 5 ? 'bg-[#1C3FB7] border-[#1C3FB7] text-white' : 'bg-gray-200 border-gray-300 text-gray-800'} border-2`}
        >
          {currentStep > 5 ? <span>&#10003;</span> : <span>5</span>}
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
