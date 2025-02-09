import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";

const WhatsappChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "2348100105085";

  const openChat = () => setIsOpen(!isOpen);
  const handleSendMessage = () => {
    if (message.trim()) {
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-64 mb-2">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-[#25D366] font-bold">Chat with Logsbase</span>
            <FaTimes className="cursor-pointer" onClick={openChat} />
          </div>
          <div className="mt-3">
            <textarea
              className="w-full p-2 border rounded focus:outline-none"
              rows="2"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              className="mt-2 flex w-full items-center justify-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={handleSendMessage}
            >
              Send <FaPaperPlane className="ml-2" />
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center"
        onClick={openChat}
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default WhatsappChat;
