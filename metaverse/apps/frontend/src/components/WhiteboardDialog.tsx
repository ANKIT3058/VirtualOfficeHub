import React from 'react'
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useAppSelector, useAppDispatch } from '../hooks'
import { closeWhiteboardDialog } from '../stores/WhiteboardStore'

export default function WhiteboardDialog() {
  const whiteboardUrl = useAppSelector((state) => state.whiteboard.whiteboardUrl)
  const dispatch = useAppDispatch()
  const open = Boolean(whiteboardUrl)

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) dispatch(closeWhiteboardDialog())
      }}
    >
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 bg-[#222639] text-white border-none">
        <div className="relative flex flex-col w-full h-[80vh] min-w-max p-4">
          <Button 
            variant="ghost" 
            className="absolute right-2 top-2 rounded-full p-2 h-8 w-8" 
            onClick={() => dispatch(closeWhiteboardDialog())}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          
          {whiteboardUrl && (
            <div className="flex-1 rounded-3xl overflow-hidden mr-6">
              <iframe 
                title="whiteboard" 
                src={whiteboardUrl} 
                className="w-full h-full bg-white"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
