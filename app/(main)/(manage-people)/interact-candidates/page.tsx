'use client'

import React, { useState } from 'react';
import { chatData, currentUserId, Message } from '@/services/chatData';
import ChatSidebar from '../../(jobs)/interviews/_components/ChatSidebar';
import ChatHeader from '../../(jobs)/interviews/_components/ChatHeader';
import MessageList from '../../(jobs)/interviews/_components/MessageList';
import MessageInput from '../../(jobs)/interviews/_components/MessageInput';



const InteractCandidates: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>('1');
  const [chats, setChats] = useState(chatData);
  const [isMobileView, setIsMobileView] = useState(false);

  // Get selected chat
  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  // Handle chat selection
  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setIsMobileView(true);
    
    // Mark messages as read
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    );
  };

  // Handle back to sidebar (mobile)
  const handleBackToSidebar = () => {
    setIsMobileView(false);
    setSelectedChatId(null);
  };

  // Handle sending message
  const handleSendMessage = (messageContent: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: messageContent,
      timestamp: new Date(),
      type: 'text'
    };

    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: messageContent,
            lastMessageTime: 'now'
          };
        }
        return chat;
      })
    );

    // Simulate typing indicator and response (optional)
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll get back to you soon.",
        "That sounds great! Looking forward to it.",
        "Received, thank you!",
        "Perfect! See you then.",
        "Understood, will prepare accordingly."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChat?.user.id || '',
        content: randomResponse,
        timestamp: new Date(),
        type: 'text'
      };

      setChats(prevChats =>
        prevChats.map(chat => {
          if (chat.id === selectedChatId) {
            return {
              ...chat,
              messages: [...chat.messages, responseMessage],
              lastMessage: randomResponse,
              lastMessageTime: 'now',
              unreadCount: selectedChatId === chat.id ? 0 : chat.unreadCount + 1
            };
          }
          return chat;
        })
      );
    }, 2000);
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Mobile: Show sidebar or chat, Desktop: Show both */}
      
      {/* Sidebar */}
      <div className={`
        ${isMobileView ? 'hidden' : 'flex'} 
        lg:flex flex-shrink-0 w-full lg:w-80
        transition-all duration-300 ease-in-out
      `}>
        <ChatSidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Chat Area */}
      <div className={`
        ${!selectedChatId && !isMobileView ? 'hidden lg:flex' : 'flex'} 
        flex-1 flex-col bg-white
        transition-all duration-300 ease-in-out
      `}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <ChatHeader
              user={selectedChat.user}
              onBack={handleBackToSidebar}
              showBackButton={true}
            />

            {/* Messages */}
            <MessageList
              messages={selectedChat.messages}
              user={selectedChat.user}
            />

            {/* Message Input */}
            <MessageInput
              onSendMessage={handleSendMessage}
            />
          </>
        ) : (
          /* Empty State for Desktop */
          <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center space-y-4 animate-in fade-in-50 duration-500">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-12 h-12 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Welcome to Interviews
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Select a conversation from the sidebar to start chatting with candidates
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile (when no chat selected) */}
      {!selectedChatId && !isMobileView && (
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setSelectedChatId('1')}
            className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-all duration-200 transform hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractCandidates