import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, Smile, X, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setAttachedFiles([]);
      adjustTextareaHeight();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate recording for 3 seconds
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage('🎤 Voice message recorded');
      }, 3000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const insertEmoji = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="bg-white border-t border-gray-200 relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-4 right-4 mb-2 z-50">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(false)}
              className="absolute top-2 right-2 z-10 p-1 hover:bg-gray-100 rounded-full bg-white shadow-sm"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <EmojiPicker
              onEmojiClick={insertEmoji}
              autoFocusSearch={false}
              //theme="light"
              emojiStyle={EmojiStyle.APPLE}
              width="100%"
              height={350}
              previewConfig={{
                defaultEmoji: "1f60a",
                defaultCaption: "What's your mood?"
              }}
              searchDisabled={false}
              skinTonesDisabled={false}
              customEmojis={[
                {
                  names: ["Alice", "alice in wonderland"],
                  imgUrl: "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png",
                  id: "alice"
                }
              ]}
              className="shadow-2xl rounded-2xl border border-gray-200 overflow-hidden"
            />
          </div>
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Attached Files */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm border border-purple-200"
              >
                {getFileIcon(file)}
                <span className="truncate max-w-32">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Input Area */}
        <div className="flex items-center space-x-3">
          {/* Attachment Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="p-2.5 hover:bg-purple-100 text-purple-600 hover:text-purple-700 transition-all duration-200 rounded-full"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </div>

          {/* Message Input Container */}
          <div className="flex-1 relative">
            <div className="flex items-end bg-gray-50 hover:bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-200 focus-within:border-purple-300 rounded-2xl border border-gray-200 px-4 py-3 transition-all duration-200 shadow-sm">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={disabled}
                className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none resize-none min-h-6 max-h-32 placeholder-gray-500 text-gray-900 leading-relaxed"
                rows={1}
              />
              
              {/* Emoji Button */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-200 text-gray-500 hover:text-yellow-600 transition-all duration-200 ml-2 rounded-lg"
                disabled={disabled}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Voice/Send Button */}
          {message.trim() || attachedFiles.length > 0 ? (
            <Button
              onClick={handleSend}
              disabled={disabled}
              className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              onClick={toggleRecording}
              disabled={disabled}
              className={`p-3 rounded-full transition-all duration-200 transform hover:scale-105 flex-shrink-0 shadow-md ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white animate-pulse shadow-red-200' 
                  : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700 hover:shadow-lg'
              }`}
            >
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center justify-center space-x-3 text-red-500 text-sm animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="font-medium">Recording voice message...</span>
            <button
              onClick={() => setIsRecording(false)}
              className="text-red-600 hover:text-red-700 font-medium underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;