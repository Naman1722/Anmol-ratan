import { useState, useEffect } from "react"
import { Phone } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { initRecaptcha, sendOtpToPhone } from "../helpers/firebase"

interface LoginPageProps {
  onLogin: (phone: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize reCAPTCHA on mount
    initRecaptcha("recaptcha-container")
  }, [])

  const handleContinue = async () => {
    const trimmed = phoneNumber.trim()
    if (!trimmed) return

    try {
      setLoading(true)
      setError(null) // clear previous errors

      // Format phone number: default to +91 if no country code provided
      let formattedPhone = trimmed
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = `+91${formattedPhone}`
      }

      // 2) Send OTP via Firebase (no backend
      await sendOtpToPhone(formattedPhone)

      // 3) Go to OTP page
      onLogin(formattedPhone)
    } catch (err) {
      console.error("Failed to send OTP via Firebase:", err)
      setError("Failed to send OTP. Please try again.")  // ✅ FIX ADDED
    } finally {
      setLoading(false)
    }
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

          {/* Recaptcha container */}
          <div
            id="recaptcha-container"
            className="mb-4 min-h-[78px] min-w-[304px] border-2 border-solid border-orange-200"
          />

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-2">{error}</p>
          )}

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
              disabled={!phoneNumber.trim() || loading}
            >
              {loading ? "Sending OTP..." : "Continue"}
            </Button>
          </div>

          <p className="text-sm text-orange-600 text-center opacity-80">
            We'll send you an OTP for verification
          </p>
        </div>
      </div>
    </div>
  )
}
