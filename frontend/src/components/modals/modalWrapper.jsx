import React, { useEffect } from 'react';
import "../../index.css"


const ModalWrapper = ({ children, onClose }) => {

	useEffect(() => {
		const handleOutsideClick = (e) => {
		  console.log("trying to close")
		  console.log(e.target.id)
		  //e.stopPropagation(); 
		  if (e.target.id == "modal-bg") {
			if (typeof onClose === 'function') {
				onClose();
			  } else {
				console.error("onClose is not a function");
			  }
		  }
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	  }, [onClose]);
  
	return (
	  <div
		id="modal-bg"
		className="fixed inset-0 w-full h-full bg-slate-800 bg-opacity-40 flex items-center justify-center modal-overlay"
		role="dialog"
		aria-modal="true"
	  >
		<div className="modal-content border-2 border-black rounded-xl overflow-hidden shadow-brutalism-lg">
		{children}
		</div>
	  </div>
	);
  };

  export default ModalWrapper