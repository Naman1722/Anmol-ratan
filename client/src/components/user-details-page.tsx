"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Phone, MapPin } from "lucide-react"

interface UserDetailsPageProps {
  phoneNumber: string
  onComplete: (details: { firstName: string; lastName: string; place: string }) => void
}

export default function UserDetailsPage({ phoneNumber, onComplete }: UserDetailsPageProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [place, setPlace] = useState("")

  const handleComplete = () => {
    if (firstName.trim() && lastName.trim() && place.trim()) {
      onComplete({ firstName, lastName, place })
    }
  }

  const isFormValid = firstName.trim() && lastName.trim() && place.trim()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-cream-50 flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white text-xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-orange-800">Complete Your Profile</h2>
          <p className="text-orange-600">Tell us a bit about yourself</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            {/* First Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-orange-200 rounded-2xl focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-orange-200 rounded-2xl focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            {/* Mobile Number (Auto-filled) */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <Input
                type="tel"
                value={phoneNumber}
                disabled
                className="pl-12 h-14 text-lg bg-gray-100 border-orange-200 rounded-2xl text-gray-600"
              />
            </div>

            {/* Place */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Your Place/City"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-orange-200 rounded-2xl focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <Button
              onClick={handleComplete}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-2xl shadow-lg"
              disabled={!isFormValid}
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
