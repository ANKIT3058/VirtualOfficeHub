import React, { useRef, useState, useEffect } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { MessageSquare, X, Smile } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import phaserGame from '../PhaserGame';
import Game from '../scenes/Game';
import { getColorByString } from '../util';
import { useAppDispatch, useAppSelector } from '../hooks';
import { MessageType, setFocused, setShowChat } from '../stores/ChatStore';

const dateFormatter = new Intl.DateTimeFormat('en', {
  timeStyle: 'short',
  dateStyle: 'short',
});

const Message = ({ chatMessage, messageType }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div 
      className="py-1 px-2 hover:bg-slate-800 break-words"
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      <TooltipProvider>
        <Tooltip open={tooltipOpen}>
          <TooltipTrigger asChild>
            {messageType === MessageType.REGULAR_MESSAGE ? (
              <p className="text-sm">
                <span style={{ color: getColorByString(chatMessage.author) }} className="font-bold">
                  {chatMessage.author}:
                </span>{" "}
                <span className="text-white">{chatMessage.content}</span>
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                {chatMessage.author} {chatMessage.content}
              </p>
            )}
          </TooltipTrigger>
          <TooltipContent side="right">
            {dateFormatter.format(chatMessage.createdAt)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const chatMessages = useAppSelector((state) => state.chat.chatMessages);
  const focused = useAppSelector((state) => state.chat.focused);
  const showChat = useAppSelector((state) => state.chat.showChat);
  const dispatch = useAppDispatch();
  const game = phaserGame.scene.keys.game as Game;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      // move focus back to the game
      inputRef.current?.blur();
      dispatch(setShowChat(false));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // this prevents double submission when Enter is pressed
    if (!readyToSubmit) {
      setReadyToSubmit(true);
      return;
    }
    
    // move focus back to the game
    inputRef.current?.blur();

    const val = inputValue.trim();
    setInputValue('');
    if (val) {
      game.network.addChatMessage(val);
      game.myPlayer.updateDialogBubble(val);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, showChat]);

  return (
    <div className="fixed bottom-16 left-0 h-96 w-96 max-h-1/2 max-w-full">
      <div className="relative h-full p-4 flex flex-col">
        {showChat ? (
          <Card className="flex flex-col h-full shadow-xl">
            <CardHeader className="py-2 px-4 bg-slate-900 rounded-t-lg flex justify-between items-center">
              <h3 className="text-lg font-medium text-white text-center w-full">Chat</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 absolute right-2 top-2"
                onClick={() => dispatch(setShowChat(false))}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="p-0 flex-grow bg-slate-800 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-2">
                  {chatMessages.map(({ messageType, chatMessage }, index) => (
                    <Message 
                      chatMessage={chatMessage} 
                      messageType={messageType} 
                      key={index} 
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {showEmojiPicker && (
                <div className="absolute bottom-14 right-4">
                  <Picker
                    theme="dark"
                    showSkinTones={false}
                    showPreview={false}
                    onSelect={(emoji) => {
                      setInputValue(inputValue + emoji.native);
                      setShowEmojiPicker(!showEmojiPicker);
                      dispatch(setFocused(true));
                    }}
                    exclude={['recent', 'flags']}
                  />
                </div>
              )}
            </CardContent>
            
            <CardFooter className="p-0 border-t border-slate-700">
              <form 
                className="flex w-full items-center bg-slate-900 rounded-b-lg" 
                onSubmit={handleSubmit}
              >
                <Input
                  ref={inputRef}
                  autoFocus={focused}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none rounded-bl-lg text-white bg-slate-900"
                  placeholder="Press Enter to chat"
                  value={inputValue}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  onFocus={() => {
                    if (!focused) {
                      dispatch(setFocused(true));
                      setReadyToSubmit(true);
                    }
                  }}
                  onBlur={() => {
                    dispatch(setFocused(false));
                    setReadyToSubmit(false);
                  }}
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon"
                  className="h-10 w-10 rounded-none rounded-br-lg"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        ) : (
          <div className="mt-auto">
            <Button
              variant="default"
              size="icon"
              className="rounded-full h-12 w-12 bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                dispatch(setShowChat(true));
                dispatch(setFocused(true));
              }}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}