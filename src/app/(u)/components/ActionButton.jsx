import React, { forwardRef } from 'react';

const ActionButton = forwardRef(({ icon, alt, onClick, styling }, ref) => (
    <div ref={ref} className={`${styling === "" ? "" : "border border-gray-900/[0.5]"} flex flex-col text-white cursor-pointer rounded p-1 relative`} onClick={onClick}>
        <img src={icon} alt={alt} className={`${styling === "" ? "w-[15px]" : "w-[20px]"}`} />
        <span className="absolute top-5 rounded hover:block hidden bg-black text-white px-2 py-1 pointer-events-none">
            {alt}
        </span>
    </div>
));

export default ActionButton;
