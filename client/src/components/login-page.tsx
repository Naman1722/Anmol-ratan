import { useState } from "react"
import { Phone } from "lucide-react"

// FIXED relative imports — adjust if your UI folder path is different
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

interface LoginPageProps {
  onLogin: (phone: string, guest?: boolean) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleContinue = () => {
    if (phoneNumber.trim()) {
      onLogin(phoneNumber)
    }
  }

  const handleGuestLogin = () => {
    onLogin("", true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-cream-50 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/spiritual-bg.png"
          alt="Spiritual background"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 right-8 w-16 h-16 bg-orange-300 rounded-full opacity-15"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {/* Logo */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
            <span className="text-white text-2xl font-bold">🕉️</span>
          </div>
          <h1 className="text-3xl font-bold text-orange-800 mb-2">भजन संग्रह</h1>
          <p className="text-orange-600 text-lg">Bhajan Sangrah</p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-orange-200 rounded-2xl focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <Button
              onClick={handleContinue}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-2xl shadow-lg"
              disabled={!phoneNumber.trim()}
            >
              Continue
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={handleGuestLogin}
              className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-4"
            >
              Enter as Guest
            </button>
          </div>

          <p className="text-sm text-orange-600 text-center opacity-80">
            We'll send you an OTP for verification
          </p>
        </div>
      </div>
    </div>
  )
}
