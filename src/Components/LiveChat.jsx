import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_URL_BACKEND);

export default function LiveChat() {
  const currentUser = useSelector((state) => state.currentUser.currentUser); // * thông tin người dùng đang đăng nhập

  const [showLiveChat, setShowLiveChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesContainerRef = useRef(null); // Tham chiếu đến container của danh sách tin nhắn

  // Cuộn xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!showLiveChat) return;

    // Kiểm tra và lấy roomId từ localStorage
    let roomId = localStorage.getItem("roomId");
    if (!roomId) {
      roomId = `room_${Date.now()}`; // Tạo roomId mới nếu chưa tồn tại
      localStorage.setItem("roomId", roomId); // Lưu roomId vào localStorage
    }

    // Kết nối với server và tham gia room
    socket.emit("joinRoom", roomId);

    // Lắng nghe tin nhắn từ server
    const handleRoomJoined = (data) => {
      setMessages(data.messages); // Thêm tin nhắn mới vào danh sách
    };

    socket.on("roomJoined", handleRoomJoined);

    const handleReceiveMessage = (data) => {
      // Thêm tin nhắn vào danh sách (tạm thời hiển thị trước khi server phản hồi)
      setMessages((prev) => [...prev, data]);
    };
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("chatEnded", () => {
      setMessages([]); // Xóa danh sách tin nhắn
      setShowLiveChat(false);
      localStorage.removeItem("roomId");
    });

    // Cleanup khi component unmount
    return () => {
      socket.off("roomJoined", handleRoomJoined); // Xóa listener
      socket.off("receiveMessage", handleReceiveMessage); // Xóa listener
      socket.off("chatEnded"); // Xóa listener
    };
  }, [showLiveChat, currentUser]);

  useEffect(() => {
    scrollToBottom(); // Cuộn xuống cuối khi danh sách tin nhắn thay đổi
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Lấy roomId từ localStorage
    const roomId = localStorage.getItem("roomId");
    const data = {
      roomId,
      content: message,
      sender: currentUser._id,
    };

    // Gửi tin nhắn lên server
    socket.emit("sendMessage", data);

    // Xóa nội dung ô nhập sau khi gửi
    setMessage("");
  };
  console.log(messages);

  const handleEndChat = () => {
    socket.emit("endChat", localStorage.getItem("roomId"));
    // Gửi tin nhắn lên server
  };

  return (
    <div className="fixed right-1 top-[85%]">
      {showLiveChat && (
        <div className="flex flex-col rounded-lg w-[330px] h-[400px] md:w-[500px] md:h-[500px] shadow-lg bg-white absolute right-1 md:right-full md:top-[-580px] top-[-420px] animate-livechat">
          <div className="flex justify-between px-2 py-4 md:px-6 md:py-4 border-b items-center">
            <h3 className="font-bold">Customer Support</h3>
            <button
              onClick={handleEndChat}
              className="text-xs px-2 py-1 bg-red-500 text-white rounded"
            >
              End Chat
            </button>
          </div>
          <div
            ref={messagesContainerRef} // Tham chiếu đến container
            className="flex flex-col gap-4 text-sm font-light overflow-y-auto px-4 py-2 grow"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-sm ${
                  msg.sender?.role === "client"
                    ? "bg-[#48B0F7] self-end text-white"
                    : "bg-[#F5F6F7] self-start text-gray-600"
                }`}
              >
                {msg.content || "No content available"}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="border-t p-2 bg-[#F9FAFB]">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Message!"
                className="focus:outline-none bg-white placeholder:text-sm px-2 py-1 text-gray-600 w-full"
              />
              <button className="cursor-pointer" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-[#48B0F7]"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
      <div
        className="bg-primary-black text-white rounded-full p-1 cursor-pointer"
        onClick={() => setShowLiveChat((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7"
        >
          <path
            fillRule="evenodd"
            d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
