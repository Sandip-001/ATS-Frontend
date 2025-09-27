import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Chat } from '@/services/chatData';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border-0 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          {filteredChats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`
                relative p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50
                ${selectedChatId === chat.id ? 'bg-purple-100 border-l-4 border-purple-600' : ''}
                animate-in slide-in-from-left-1 duration-300
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar with Status */}
                <div className="relative flex-shrink-0">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {chat.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(chat.user.status)}`}
                  />
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {chat.user.name}
                    </h3>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {chat.lastMessageTime}
                      </span>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center animate-pulse">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>

              {/* New Badge */}
              {selectedChatId === chat.id && chat.id === '1' && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded animate-bounce">
                    New
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <Search className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-center">No chats found</p>
            <p className="text-sm text-center mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;