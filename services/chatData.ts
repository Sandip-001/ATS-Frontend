// constants/chatData.ts

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export const chatData: Chat[] = [
  {
    id: '1',
    user: {
      id: 'alex-johnson',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'online'
    },
    lastMessage: 'Hey! How\'s it going?',
    lastMessageTime: '2m ago',
    unreadCount: 2,
    messages: [
      {
        id: '1',
        senderId: 'alex-johnson',
        content: 'Hey! How\'s it going?',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'current-user',
        content: 'Hi Alex, thank you for applying to the UI/UX Designer for Mobile App position. We\'ve reviewed your portfolio, and we\'re impressed! Would you be available for a quick Zoom interview this Thursday at 2:00 PM?',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'alex-johnson',
        content: 'Hi! Thanks for the opportunity. Yes, Thursday at 2:00 PM works perfectly. Please send over the meeting link. Looking forward to it!',
        timestamp: new Date(Date.now() - 30 * 1000),
        type: 'text'
      },
      {
        id: '4',
        senderId: 'current-user',
        content: 'Great! Here\'s the Zoom link for the call: https://zoom.us/j/1234567890 Let us know if anything changes. See you Thursday!',
        timestamp: new Date(),
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    user: {
      id: 'emily-davis',
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'away'
    },
    lastMessage: 'Meeting at 3 PM.',
    lastMessageTime: '10m ago',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        senderId: 'emily-davis',
        content: 'Good morning! I wanted to confirm our interview scheduled for today.',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'current-user',
        content: 'Good morning Emily! Yes, we have the interview scheduled at 3 PM today. Looking forward to meeting you.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'emily-davis',
        content: 'Perfect! Meeting at 3 PM.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        type: 'text'
      }
    ]
  },
  {
    id: '3',
    user: {
      id: 'jessica-lee',
      name: 'Jessica Lee',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
      lastSeen: '1h ago'
    },
    lastMessage: 'Could you send me the files?',
    lastMessageTime: '20m ago',
    unreadCount: 1,
    messages: [
      {
        id: '1',
        senderId: 'current-user',
        content: 'Hi Jessica, thank you for your interest in the Frontend Developer position. We\'d like to proceed with a technical interview.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'jessica-lee',
        content: 'That sounds great! I\'m excited about the opportunity. When would be a good time?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'jessica-lee',
        content: 'Could you send me the files?',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        type: 'text'
      }
    ]
  },
  {
    id: '4',
    user: {
      id: 'sophia-turner',
      name: 'Sophia Turner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online'
    },
    lastMessage: 'Don\'t forget our lunch tomorrow!',
    lastMessageTime: '45m ago',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        senderId: 'sophia-turner',
        content: 'Hi! I hope you\'re having a great day.',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'current-user',
        content: 'Hello Sophia! Thank you for your application. We\'re impressed with your background.',
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'sophia-turner',
        content: 'Don\'t forget our lunch tomorrow!',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        type: 'text'
      }
    ]
  },
  {
    id: '5',
    user: {
      id: 'michael-brown',
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      status: 'away'
    },
    lastMessage: 'Ready for the presentation?',
    lastMessageTime: '1h ago',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        senderId: 'michael-brown',
        content: 'Good afternoon! Thank you for considering my application.',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'current-user',
        content: 'Hi Michael! We\'d like to schedule a final presentation round with you.',
        timestamp: new Date(Date.now() - 70 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'michael-brown',
        content: 'Ready for the presentation?',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        type: 'text'
      }
    ]
  },
  {
    id: '6',
    user: {
      id: 'olivia-smith',
      name: 'Olivia Smith',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
      lastSeen: '2h ago'
    },
    lastMessage: 'Let\'s catch up later!',
    lastMessageTime: '1h 30m ago',
    unreadCount: 3,
    messages: [
      {
        id: '1',
        senderId: 'olivia-smith',
        content: 'Hello! I\'m very interested in the Product Manager role.',
        timestamp: new Date(Date.now() - 120 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'current-user',
        content: 'Hi Olivia! Great to hear from you. Let\'s schedule a call to discuss further.',
        timestamp: new Date(Date.now() - 100 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'olivia-smith',
        content: 'Let\'s catch up later!',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        type: 'text'
      }
    ]
  },
  {
    id: '7',
    user: {
      id: 'ava-martinez',
      name: 'Ava Martinez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      status: 'online'
    },
    lastMessage: 'Any updates on the project?',
    lastMessageTime: '2h 15m ago',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        senderId: 'ava-martinez',
        content: 'Hi there! I submitted my portfolio yesterday.',
        timestamp: new Date(Date.now() - 150 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'current-user',
        content: 'Thank you Ava! We\'ll review it and get back to you soon.',
        timestamp: new Date(Date.now() - 140 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'ava-martinez',
        content: 'Any updates on the project?',
        timestamp: new Date(Date.now() - 135 * 60 * 1000),
        type: 'text'
      }
    ]
  },
  {
    id: '8',
    user: {
      id: 'noah-garcia',
      name: 'Noah Garcia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
      lastSeen: '3h ago'
    },
    lastMessage: 'Can you review my code?',
    lastMessageTime: '3h ago',
    unreadCount: 1,
    messages: [
      {
        id: '1',
        senderId: 'noah-garcia',
        content: 'Hello! I\'ve completed the coding challenge you sent.',
        timestamp: new Date(Date.now() - 200 * 60 * 1000),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'current-user',
        content: 'Excellent! We\'ll review your submission and provide feedback.',
        timestamp: new Date(Date.now() - 185 * 60 * 1000),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'noah-garcia',
        content: 'Can you review my code?',
        timestamp: new Date(Date.now() - 180 * 60 * 1000),
        type: 'text'
      }
    ]
  }
];

export const currentUserId = 'current-user';