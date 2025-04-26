import { useState } from "react"
import { Eye, EyeOff, X, ArrowLeft } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const CreateRoomForm = ({ isOpen, onClose }: Props) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Room Created:", values)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay Background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        />

      {/* Modal */}
      <div className="relative z-50 w-[90%] max-w-md bg-[#1e2235] text-white rounded-xl shadow-lg px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
            <h2 className="text-xl font-bold">Create Custom Room</h2>
          </div>
          <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold block mb-1">Name</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Room name"
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold block mb-1">Description</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Enter description..."
              rows={3}
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            ></textarea>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold block mb-1">Password (optional)</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                placeholder="Leave blank for no password"
                className="w-full px-3 py-2 pr-10 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 rounded-md transition duration-200"
          >
            CREATE
          </button>
        </form>
      </div>
    </div>
  )
}