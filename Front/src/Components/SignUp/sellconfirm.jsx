import React, { useState } from 'react';

const Sellconfirm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenPopup = () => {
        const windowFeatures = "left=500,top=100,width=420,height=320";
        const handle = window.open(
            
          `http://localhost:3000/Message`,
          "popupWindow",
          windowFeatures,
        );
    
        // Close the window after 5 seconds (for demonstration purposes)
        setTimeout(() => {
          handle.close();
        }, 10000);
    
        setIsOpen(true);
      };
return(
<div>
    
      
    {!isOpen && (
        <button onClick={handleOpenPopup}>
          Open Popup
        </button>
      )}
      {isOpen && (
        <p>Popup window is open.</p>
      )}
      
   
</div>
        
    );
}

export default Sellconfirm;






