import React from 'react';
import { X, Monitor } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { useAppSelector, useAppDispatch } from '../hooks';
import { closeComputerDialog } from '../stores/ComputerStore';
import Video from './Video';

function VideoContainer({ playerName, stream }) {
  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <Video srcObject={stream} autoPlay className="absolute inset-0 w-full h-full min-w-0 min-h-0 object-contain"></Video>
      {playerName && (
        <div className="absolute bottom-4 left-4 text-white overflow-hidden text-ellipsis whitespace-nowrap shadow-md">
          {playerName}
        </div>
      )}
    </div>
  );
}

export default function ComputerDialog() {
  const dispatch = useAppDispatch();
  const playerNameMap = useAppSelector((state) => state.user.playerNameMap);
  const shareScreenManager = useAppSelector((state) => state.computer.shareScreenManager);
  const myStream = useAppSelector((state) => state.computer.myStream);
  const peerStreams = useAppSelector((state) => state.computer.peerStreams);

  return (
    <div className="fixed inset-0 p-4 pr-44 overflow-hidden">
      <Card className="w-full h-full bg-slate-900 rounded-lg p-4 text-slate-100 relative flex flex-col shadow-lg">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
          onClick={() => dispatch(closeComputerDialog())}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="mb-4">
          <Button
            variant={shareScreenManager?.myStream ? "destructive" : "default"}
            className="flex items-center gap-2"
            onClick={() => {
              if (shareScreenManager?.myStream) {
                shareScreenManager?.stopScreenShare();
              } else {
                shareScreenManager?.startScreenShare();
              }
            }}
          >
            <Monitor className="h-4 w-4" />
            {shareScreenManager?.myStream ? 'Stop sharing' : 'Share Screen'}
          </Button>
        </div>

        <CardContent className="flex-1 min-h-0 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
            {myStream && <VideoContainer stream={myStream} playerName="You" />}
            {[...peerStreams.entries()].map(([id, { stream }]) => {
              const playerName = playerNameMap.get(id);
              return <VideoContainer key={id} playerName={playerName} stream={stream} />;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}