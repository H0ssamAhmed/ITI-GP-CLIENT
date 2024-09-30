import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const MessageList = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState({
    "الأستاذ أحمد": [],
    "المعلم خالد": [],
  });

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      setConversations((prev) => ({
        ...prev,
        [activeChat]: [...prev[activeChat], { message, fromUser: true }],
      }));
      setMessage("");
    }
  };

  const handleReceiveMessage = (chatName, msg) => {
    setConversations((prev) => ({
      ...prev,
      [chatName]: [...prev[chatName], { message: msg, fromUser: false }],
    }));
  };

  return (
    <div className="flex h-[60rem] rounded-lg shadow-lg bg-white overflow-hidden">
      {/* قائمة المحادثات */}
      <div className="w-1/3 h-full p-4 bg-gray-100">
        <h2 className="mb-4 text-xl font-semibold text-right text-brand-200">
          المحادثات
        </h2>
        <ul>
          {Object.keys(conversations).map((chat) => (
            <li
              key={chat}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center cursor-pointer p-3 mb-3 rounded-md hover:bg-gray-200 ${
                activeChat === chat ? "bg-gray-300" : "bg-white"
              }`}
            >
              <FaUserCircle className="mr-3 text-2xl text-gray-600" />
              <span className="text-lg text-right text-gray-800">{chat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* نافذة المحادثة */}
      <div className="flex flex-col w-2/3 p-4 bg-gray-50">
        {activeChat ? (
          <>
            <div className="flex-1 mb-4 overflow-y-auto">
              {conversations[activeChat].map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${
                    msg.fromUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[60%] p-3 rounded-lg text-sm ${
                      msg.fromUser
                        ? "bg-brand-200 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 px-4 py-2 text-right bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 ml-4 text-white rounded-md bg-brand-200"
              >
                إرسال
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            اختر محادثة لبدء التواصل
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
