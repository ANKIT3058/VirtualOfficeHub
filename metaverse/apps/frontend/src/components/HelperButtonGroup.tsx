import React, { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip'
import { 
  HelpCircle, 
  Share, 
  Github, 
  Sun, 
  Moon,
  X, 
  Lightbulb, 
  ArrowRight, 
  Gamepad, 
  GamepadOff
} from 'lucide-react'

import { BackgroundMode } from '../../../types/BackgroundMode'
import { setShowJoystick, toggleBackgroundMode } from '../stores/UserStore'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getAvatarString, getColorByString } from '../util'

export default function HelperButtonGroup() {
  const [showControlGuide, setShowControlGuide] = useState(false)
  const [showRoomInfo, setShowRoomInfo] = useState(false)
  const showJoystick = useAppSelector((state) => state.user.showJoystick)
  const backgroundMode = useAppSelector((state) => state.user.backgroundMode)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)
  const roomId = useAppSelector((state) => state.room.roomId)
  const roomName = useAppSelector((state) => state.room.roomName)
  const roomDescription = useAppSelector((state) => state.room.roomDescription)
  const dispatch = useAppDispatch()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="fixed flex gap-2 bottom-4 right-4 items-end">
      <div className="flex flex-col gap-2">
        {roomJoined && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full" 
                  onClick={() => dispatch(setShowJoystick(!showJoystick))}
                >
                  {showJoystick ? <GamepadOff size={20} /> : <Gamepad size={20} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showJoystick ? 'Disable virtual joystick' : 'Enable virtual joystick'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {showRoomInfo && (
          <Card className="relative w-72 text-base">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 h-6 w-6" 
              onClick={() => setShowRoomInfo(false)}
            >
              <X size={16} />
            </Button>
            
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Avatar style={{ background: getColorByString(roomName) }}>
                  <AvatarFallback>{getAvatarString(roomName)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{roomName}</h3>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <ArrowRight size={16} className="mr-1" />
                <span>ID: {roomId}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <ArrowRight size={16} className="mr-1" />
                <span>Description: {roomDescription}</span>
              </div>
              
              <p 
                className="text-sm cursor-pointer hover:text-primary" 
                onClick={copyToClipboard}
              >
                {window.location.href}
              </p>
            </CardContent>
          </Card>
        )}
        
        {showControlGuide && (
          <Card className="relative w-72">
            <CardHeader className="pb-0">
              <CardTitle className="text-center">Controls</CardTitle>
            </CardHeader>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 h-6 w-6" 
              onClick={() => setShowControlGuide(false)}
            >
              <X size={16} />
            </Button>
            
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>W, A, S, D or arrow keys</strong> to move
                </li>
                <li>
                  <strong>E</strong> to sit down (when facing a chair)
                </li>
                <li>
                  <strong>R</strong> to use computer to screen share (when facing a computer)
                </li>
                <li>
                  <strong>Enter</strong> to open chat
                </li>
                <li>
                  <strong>ESC</strong> to close chat
                </li>
              </ul>
              
              <div className="flex items-center mt-4 text-xs text-muted-foreground">
                <Lightbulb size={16} className="mr-2" />
                Video connection will start if you are close to someone else
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="flex gap-2">
        {roomJoined && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full" 
                    onClick={() => {
                      setShowRoomInfo(!showRoomInfo)
                      setShowControlGuide(false)
                    }}
                  >
                    <Share size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Room Info</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full" 
                    onClick={() => {
                      setShowControlGuide(!showControlGuide)
                      setShowRoomInfo(false)
                    }}
                  >
                    <HelpCircle size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Control Guide</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full"
                asChild
              >
                <a 
                  href="https://github.com/thex3family/x3-metaverse" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Visit Our GitHub</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full" 
                onClick={() => dispatch(toggleBackgroundMode())}
              >
                {backgroundMode === BackgroundMode.DAY ? 
                  <Moon size={20} /> : 
                  <Sun size={20} />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent>Switch Background Theme</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}