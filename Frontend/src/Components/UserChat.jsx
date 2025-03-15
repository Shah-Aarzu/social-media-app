import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faPlus,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import MessageFromUser from "./MessageFromUser";
import MessageToUser from "./MessageToUser";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, getMessages } from "../redux/slices/user/Messages.slice";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

function UserChat({ chats, username, receiverId }) {
  const socket = useSelector((state) => state.socket.socket);

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const bottomRef = useRef();
  const [chat, setChat] = useState(chats.chats || []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [chat]);

  useEffect(() => {
    setChat(chats.chats);
  }, [chats]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await dispatch(
      setMessages({
        token: localStorage.getItem("userToken"),
        message,
        username: chats.username,
        receiverId,
      })
    );

    setMessage("");
  };

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setChat((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  return (
    <>
      <div className="relative overflow-hidden h-screen">
        <header>
          <div className=" flex justify-between items-center bg-gray-100 absolute top-0 w-full p-3">
            <div className=" flex items-center gap-5">
              <img
                src={chats.profile}
                alt="image"
                className=" bg-orange-500 w-12 h-12 rounded-full"
              />
              <p>{chats.fullname}</p>
            </div>
            <div className=" flex gap-5">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="px-5 text-2xl text-slate-500"
              />
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className=" text-2xl text-slate-500"
              />
            </div>
          </div>
        </header>
        <main>
          <div className=" overflow-auto w-full h-screen px-20 py-24 bg-zinc-50">
            {chat.length > 0 ? (
              <>
                {chat.map((chat) =>
                  chat.username === username ? (
                    <MessageFromUser key={nanoid()} chat={chat} />
                  ) : (
                    <MessageToUser key={nanoid()} chat={chat} />
                  )
                )}
                <div ref={bottomRef}></div>
              </>
            ) : (
              <div className="h-full flex justify-center items-center">
                No Chats !!
              </div>
            )}
          </div>
        </main>
        <footer>
          <form onSubmit={sendMessage}>
            <div className=" bg-gray-100 p-3 flex gap-5 items-center absolute bottom-0 w-full">
              <FontAwesomeIcon
                icon={faPlus}
                className=" text-2xl text-slate-500"
              />
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                className=" rounded-md outline-none p-3 w-full"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className=" text-2xl text-slate-500"
                type="submit"
                onClick={sendMessage}
              />
            </div>
          </form>
        </footer>
      </div>
    </>
  );
}

export default UserChat;
