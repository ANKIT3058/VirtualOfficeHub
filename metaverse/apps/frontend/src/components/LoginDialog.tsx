import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel'
import { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react'

// Import avatar images
import Adam from '../images/login/Adam_login.png'
import Ash from '../images/login/Ash_login.png'
import Lucy from '../images/login/Lucy_login.png'
import Nancy from '../images/login/Nancy_login.png'

import { useAppSelector, useAppDispatch } from '../hooks'
import { setLoggedIn } from '../stores/UserStore'
import { getAvatarString, getColorByString } from '../util'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

// Avatar options
const avatars = [
  { name: 'adam', img: Adam },
  { name: 'ash', img: Ash },
  { name: 'lucy', img: Lucy },
  { name: 'nancy', img: Nancy },
]

// Shuffle the avatars array
for (let i = avatars.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[avatars[i], avatars[j]] = [avatars[j], avatars[i]]
}

export default function LoginDialog() {
  const [name, setName] = useState<string>('')
  const [avatarIndex, setAvatarIndex] = useState<number>(0)
  const [nameFieldEmpty, setNameFieldEmpty] = useState<boolean>(false)
  
  const dispatch = useAppDispatch()
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)
  const roomName = useAppSelector((state) => state.room.roomName)
  const roomDescription = useAppSelector((state) => state.room.roomDescription)
  
  const game = phaserGame.scene.keys.game as Game

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name === '') {
      setNameFieldEmpty(true)
    } else if (roomJoined) {
      console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name)
      game.registerKeys()
      game.myPlayer.setPlayerName(name)
      game.myPlayer.setPlayerTexture(avatars[avatarIndex].name)
      game.network.readyToConnect()
      dispatch(setLoggedIn(true))
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Card className="w-[540px] bg-[#222639] text-white shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl text-gray-300">Joining</CardTitle>
          <div className="flex justify-center items-center gap-2 mt-2">
            <Avatar style={{ background: getColorByString(roomName) }}>
              <AvatarFallback>{getAvatarString(roomName)}</AvatarFallback>
            </Avatar>
            <h3 className="text-2xl font-semibold">{roomName}</h3>
          </div>
          <div className="text-center text-gray-400 max-h-32 overflow-y-auto mt-2">
            {roomDescription}
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="flex gap-12 py-6">
            {/* Left side - Avatar selection */}
            <div className="flex flex-col items-center">
              <h3 className="text-base text-center mb-4 text-gray-200">Select an avatar</h3>
              <Carousel 
                className="w-40" 
                onSelect={(index) => setAvatarIndex(index)}
              >
                <CarouselContent>
                  {avatars.map((avatar, index) => (
                    <CarouselItem key={avatar.name}>
                      <div className="flex justify-center items-center h-56 bg-[#dbdbe0] rounded-md">
                        <img 
                          src={avatar.img} 
                          alt={avatar.name} 
                          className="w-24 h-36 object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1 w-6 h-6" />
                <CarouselNext className="right-1 w-6 h-6" />
              </Carousel>
            </div>
            
            {/* Right side - Name input and webcam status */}
            <div className="flex flex-col w-64 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Name</Label>
                <Input
                  id="name"
                  autoFocus
                  className={`bg-background text-gray-100 ${nameFieldEmpty ? 'border-red-500' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameFieldEmpty && (
                  <p className="text-xs text-red-500">Name is required</p>
                )}
              </div>
              
              <div className="mt-4">
                {!videoConnected ? (
                  <div className="space-y-2">
                    <Alert variant="destructive" className="border-yellow-600 bg-yellow-900/20">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        No webcam/mic connected - <strong>connect one for best experience!</strong>
                      </AlertDescription>
                    </Alert>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => {
                        game.network.webRTC?.getUserMedia()
                      }}
                    >
                      Connect Webcam
                    </Button>
                  </div>
                ) : (
                  <Alert className="bg-green-900/20 border-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Webcam connected!</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6">
            <Button type="submit" size="lg">
              Join
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}