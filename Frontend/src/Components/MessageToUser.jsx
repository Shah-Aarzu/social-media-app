function MessageToUser({ chat }) {
  return (
    <>
      <div className=" flex justify-end">
        <div className=" flex gap-2 p-2 shadow rounded-md bg-amber-100 mb-1">
          <p className=" text-wrap ">{chat.message}</p>
          <p className=" text-xs flex items-end text-nowrap">
            {chat.createdAt}
          </p>
        </div>
      </div>
    </>
  );
}

export default MessageToUser;
