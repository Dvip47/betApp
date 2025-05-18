import React from 'react';

const StatusItem = ({ icon, text, styling, setUserStatus, statusId }) => (


  <div className={`${styling || "bg-gray-900/[0.1] hover:bg-gray-100"} cursor-pointer py-1 col-span-1 rounded flex flex-col justify-center items-center`} onClick={() => setUserStatus(statusId)}>
    <img src={icon} alt={text} className="h-[22.5px] w-[22.5px]" />
    <p className="font-bold text-[0.8rem] tracking-wider">{text}</p>
  </div>



);

const StatusGrid = ({ userStatus, setUserStatus }) => (
  <div className="grid grid-cols-3 gap-2">
    <StatusItem statusId="active" styling={userStatus === "active" && "bg-gray-900/[0.5] shadow-lg shadow-gray-800/[0.3]"} setUserStatus={setUserStatus} icon="/active.png" text={userStatus === "active" ? "Active" : "Activate"} />
    <StatusItem statusId="suspended" styling={userStatus === "suspended" && "bg-gray-900/[0.5] shadow-lg shadow-gray-800/[0.3]"} setUserStatus={setUserStatus} icon="/block.png" text={userStatus === "suspended" ? "Suspended" : "Suspend"} />
    <StatusItem statusId="locked" styling={userStatus === "locked" && "bg-gray-900/[0.5] shadow-lg shadow-gray-800/[0.3]"} setUserStatus={setUserStatus} icon="/locked.png" text={userStatus === "locked" ? "Locked" : "Lock"} />
  </div>
);

export default StatusGrid;
