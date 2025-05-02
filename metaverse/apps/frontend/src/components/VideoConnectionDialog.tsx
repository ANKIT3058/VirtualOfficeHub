import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import phaserGame from "../PhaserGame"
import Game from "../scenes/Game"

export default function VideoConnectionDialog() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            No webcam connected
            <br />
            <strong>Connect one for full experience!</strong>
          </AlertDescription>
        </Alert>
        <Button
          variant="secondary"
          onClick={() => {
            const game = phaserGame.scene.keys.game as Game
            game.network.webRTC?.getUserMedia()
          }}
        >
          Connect Webcam
        </Button>
      </DialogContent>
    </Dialog>
  )
}
