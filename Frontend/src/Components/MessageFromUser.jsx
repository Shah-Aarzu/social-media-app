function MessageFromUser({ chat }) {
  return (
    <>
      <div className=" flex">
        <div className=" flex gap-2 p-2 shadow rounded-md bg-slate-100 mb-1">
          <p className=" text-wrap overflow-auto">{chat.message}</p>
          <p className=" text-xs flex items-end text-nowrap">
            {chat.createdAt}
          </p>
        </div>
      </div>
    </>
  );
}

export default MessageFromUser;
