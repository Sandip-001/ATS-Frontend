import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message, User, currentUserId } from '@/services/chatData';

interface MessageListProps {
  messages: Message[];
  user: User;
}

const MessageList: React.FC<MessageListProps> = ({ messages, user }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(timestamp);
  };

  const isCurrentUser = (senderId: string) => senderId === currentUserId;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((message, index) => {
        const isOwn = isCurrentUser(message.senderId);
        const showAvatar = !isOwn && (index === 0 || !isCurrentUser(messages[index - 1]?.senderId));
        
        return (
          <div
            key={message.id}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`flex max-w-xs lg:max-w-md space-x-2 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar for other user */}
              {!isOwn && (
                <div className={`flex-shrink-0 ${showAvatar ? '' : 'invisible'}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {/* Message Content */}
              <div className={`group ${isOwn ? 'items-end' : 'items-start'}`}>
                <div
                  className={`
                    relative px-4 py-2 rounded-2xl max-w-full break-words shadow-sm
                    ${isOwn 
                      ? 'bg-purple-600 text-white rounded-br-md' 
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                    }
                    hover:shadow-md transition-shadow duration-200
                  `}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Message Tail */}
                  <div
                    className={`
                      absolute bottom-0 w-3 h-3 
                      ${isOwn 
                        ? 'right-0 transform translate-x-1 bg-purple-600' 
                        : 'left-0 transform -translate-x-1 bg-white border-l border-b border-gray-200'
                      }
                    `}
                    style={{
                      clipPath: isOwn 
                        ? 'polygon(0 0, 100% 0, 0 100%)' 
                        : 'polygon(100% 0, 100% 100%, 0 0)'
                    }}
                  />
                </div>
                
                {/* Timestamp */}
                <div className={`mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                  <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;