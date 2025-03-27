type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ setIsOpen, isOpen, children }) => {
  return (
    isOpen && (
      <div
        className='modaloverlay fixed top-0 left-0 w-[100%] h-[100%] bg-[#00000099] flex justify-center items-center z-10'
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {/* <div
          className='modalcontainer bg-white w-[80%] max-w-6xl px-[5dvw] py-[5dvh] rounded-[20px] z-20'
          onClick={(e) => e.stopPropagation()}
        > */}
        {children}
        {/* </div> */}
      </div>
    )
  );
};
export { Modal };
