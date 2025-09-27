import React from 'react';
import { ArrowLeft, Phone, Search, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '@/services/chatData';

interface ChatHeaderProps {
  user: User;
  onBack?: () => void;
  showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  user,
  onBack,
  showBackButton = false,
}) => {
  const getStatusInfo = () => {
    switch (user.status) {
      case 'online':
        return { color: 'bg-green-500', text: 'Online' };
      case 'away':
        return { color: 'bg-yellow-500', text: 'Away' };
      default:
        return { 
          color: 'bg-gray-400', 
          text: user.lastSeen ? `Last seen ${user.lastSeen}` : 'Offline' 
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Back Button for Mobile */}
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="lg:hidden p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        {/* User Avatar and Info */}
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusInfo.color}`}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-gray-900">{user.name}</h2>
            {user.status === 'online' && (
              <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded animate-pulse">
                New
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{statusInfo.text}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <Search className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <Phone className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;