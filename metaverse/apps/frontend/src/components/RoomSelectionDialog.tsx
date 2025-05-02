import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, HelpCircle } from "lucide-react"

import logo from '../images/logo.png'
import animatedLogo from '../images/animated_logo.mp4'
import { CustomRoomTable } from './CustomRoomTable'
import { CreateRoomForm } from './CreateRoomForm'
import { useAppSelector } from '../hooks'

import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'

export default function RoomSelectionDialog() {
  const [showCustomRoom, setShowCustomRoom] = useState(false)
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined)

  const handleConnect = () => {
    if (lobbyJoined) {
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.network!
        .joinOrCreatePublic()
        .then(() => bootstrap.launchGame())
        .catch((error) => console.error(error))
    } else {
      setShowSnackbar(true)
    }
  }

  const handleCloseSnackbar = () => {
    setShowSnackbar(false)
  }

  // Auto-hide the snackbar after 3 seconds
  if (showSnackbar) {
    setTimeout(handleCloseSnackbar, 3000)
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-14">
      {showSnackbar && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Alert variant="destructive" className="bg-red-50 text-red-800 border border-red-300">
            <AlertDescription>
              Trying to connect to server, please try again!
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <Card className="bg-[#222639] shadow-md w-[500px]">
        <CardContent className="p-9">
          {showCreateRoomForm ? (
            <div className="flex flex-col gap-5 items-center">
              <div className="relative w-full flex justify-center mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowCreateRoomForm(false)} 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <CardTitle className="text-xl text-white">Create Custom Room</CardTitle>
              </div>
              <CreateRoomForm />
            </div>
          ) : showCustomRoom ? (
            <div className="flex flex-col gap-5 items-center">
              <div className="relative w-full flex justify-center mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowCustomRoom(false)} 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <CardTitle className="text-xl text-white flex items-center">
                  Custom Rooms
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-2 text-white">
                          <HelpCircle className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        We update the results in realtime, no refresh needed!
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </div>
              <CustomRoomTable />
              <Button 
                onClick={() => setShowCreateRoomForm(true)}
                className="mt-4"
              >
                Create new room
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 items-center">
              <CardTitle className="text-xl text-white">The Co-x3 Family Metaverse</CardTitle>
              <div className="flex flex-col gap-5 items-center my-5">
                <video autoPlay muted playsInline loop className="w-3/4 rounded">
                  <source src={animatedLogo} type="video/mp4" />
                  <img src={logo} alt="Logo" className="rounded-md h-30" />
                </video>
                <Button 
                  className="w-full"
                  onClick={handleConnect}
                >
                  Connect To Public Lobby
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => (lobbyJoined ? setShowCustomRoom(true) : setShowSnackbar(true))}
                >
                  Explore Custom Rooms
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!lobbyJoined && (
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium text-[#33ac96] mb-2">Connecting to server...</h3>
          <Progress value={75} className="w-[360px]" />
        </div>
      )}
    </div>
  )
}