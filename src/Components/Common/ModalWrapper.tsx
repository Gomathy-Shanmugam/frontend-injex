import React from "react";
 
type ModalWrapperProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
 
const ModalWrapper: React.FC<ModalWrapperProps> = ({
  show,
  onClose,
  children,
}) => {
  if (!show) return null;
 
  return (
    <div
    style={{position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(4px)',}}
      onClick={onClose} // closes modal on outside click
    >
      {/* stopPropagation to prevent modal from closing when clicking inside */}
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: "white", borderRadius:"0.375rem"
      }}>
        {children}
      </div>
    </div>
  );
};
 
export default ModalWrapper;