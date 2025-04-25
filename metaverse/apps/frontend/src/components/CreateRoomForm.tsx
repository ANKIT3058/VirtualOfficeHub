import React, { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Assuming we're using the same type from your original implementation
interface IRoomData {
  name: string;
  description: string;
  password: string | null;
  autoDispose: boolean;
}

interface CreateRoomFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ isOpen, onClose }) => {
  const [values, setValues] = useState<IRoomData>({
    name: '',
    description: '',
    password: null,
    autoDispose: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [nameError, setNameError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  
  // You'll need to adapt this to your state management approach
  // const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined)
  const lobbyJoined = true; // Placeholder - replace with your actual state

  const handleChange = (prop: keyof IRoomData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [prop]: event.target.value })
    
    // Clear errors when user types
    if (prop === 'name' && nameError) setNameError("")
    if (prop === 'description' && descriptionError) setDescriptionError("")
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Validate inputs
    let isValid = true
    
    if (values.name === '') {
      setNameError("Name is required")
      isValid = false
    }
    
    if (values.description === '') {
      setDescriptionError("Description is required")
      isValid = false
    }

    // Submit if valid
    if (isValid && lobbyJoined) {
      // Replace this with your actual implementation
      console.log('Creating room with:', values)
      
      // Example of what you might do:
      // const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      // bootstrap.network
      //   .createCustom(values)
      //   .then(() => bootstrap.launchGame())
      //   .catch((error) => console.error(error))
      
      // Close the dialog
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Space</DialogTitle>
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Space name"
              value={values.name}
              onChange={handleChange('name')}
              className={nameError ? "border-red-500" : ""}
              autoFocus
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your space"
              value={values.description}
              onChange={handleChange('description')}
              className={descriptionError ? "border-red-500" : ""}
              rows={4}
            />
            {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password (optional)</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Leave blank for no password"
                value={values.password || ''}
                onChange={handleChange('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}