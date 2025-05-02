import React, { useState } from 'react';
import { Users, Lock } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { useAppSelector } from '../hooks';
import { getAvatarString, getColorByString } from '../util';
import phaserGame from '../PhaserGame';
import Bootstrap from '../scenes/Bootstrap';

export const CustomRoomTable = () => {
  const [password, setPassword] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordFieldEmpty, setPasswordFieldEmpty] = useState(false);
  
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);
  const availableRooms = useAppSelector((state) => state.room.availableRooms);

  const handleJoinClick = (roomId, password) => {
    if (!lobbyJoined) return;
    
    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
    bootstrap.network
      .joinCustomById(roomId, password)
      .then(() => bootstrap.launchGame())
      .catch((error) => {
        console.error(error);
        if (password) setShowPasswordError(true);
      });
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const isValidPassword = password !== '';

    if (isValidPassword === passwordFieldEmpty) setPasswordFieldEmpty(!passwordFieldEmpty);
    if (isValidPassword) handleJoinClick(selectedRoom, password);
  };

  const resetPasswordDialog = () => {
    setShowPasswordDialog(false);
    setPassword('');
    setPasswordFieldEmpty(false);
    setShowPasswordError(false);
  };

  if (availableRooms.length === 0) {
    return (
      <div className="py-6 text-center text-lg text-slate-300">
        There are no custom rooms right now, create one or join the adventure.
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[500px] w-full rounded-md border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className="text-center w-12">
                <Users size={16} />
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableRooms.map((room) => {
              const { roomId, metadata, clients } = room;
              const { name, description, hasPassword } = metadata;
              return (
                <TableRow key={roomId}>
                  <TableCell>
                    <Avatar className="h-8 w-8" style={{ background: getColorByString(name) }}>
                      <AvatarFallback className="text-sm">
                        {getAvatarString(name)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium break-words min-w-24">
                    {name}
                  </TableCell>
                  <TableCell className="break-words min-w-40">
                    {description}
                  </TableCell>
                  <TableCell>{roomId}</TableCell>
                  <TableCell className="text-center">{clients}</TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (hasPassword) {
                                setShowPasswordDialog(true);
                                setSelectedRoom(roomId);
                              } else {
                                handleJoinClick(roomId, null);
                              }
                            }}
                          >
                            <div className="flex items-center gap-1">
                              {hasPassword && <Lock className="h-4 w-4" />}
                              Join
                            </div>
                          </Button>
                        </TooltipTrigger>
                        {hasPassword && (
                          <TooltipContent>
                            <p>Password required</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog open={showPasswordDialog} onOpenChange={(open) => {
        if (!open) resetPasswordDialog();
      }}>
        <DialogContent className="bg-slate-800 text-slate-100 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-center">Private Room</DialogTitle>
            <DialogDescription className="text-center text-slate-300">
              This is a private room, please enter password:
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit}>
            <div className="flex flex-col gap-4 py-4">
              <Input
                autoFocus
                className={`bg-slate-900 border-slate-700 ${passwordFieldEmpty ? 'border-red-500' : ''}`}
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordFieldEmpty && (
                <p className="text-sm text-red-500">Password is required</p>
              )}
              {showPasswordError && (
                <Alert variant="destructive" className="bg-red-900 border-red-700 text-slate-100">
                  <AlertDescription>Incorrect Password!</AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" type="button" onClick={resetPasswordDialog}>
                Cancel
              </Button>
              <Button type="submit">Join</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};