import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

interface OTPPageProps {
  phoneNumber: string
  onVerify: () => void
}

export default function OTPPage({ phoneNumber, onVerify }: OTPPageProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(30)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    if (otp.every((digit) => digit !== "")) {
      onVerify()
    }
  }

  const handleResend = () => {
    setTimer(30)
    setOtp(["", "", "", "", "", ""])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-cream-50 flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white text-xl">🔑</span>
          </div>
          <h2 className="text-2xl font-bold text-orange-800">Verify OTP</h2>
          <p className="text-orange-600">Enter the OTP sent to {phoneNumber}</p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => { inputRefs.current[index] = el}}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-bold bg-white border-orange-200 rounded-xl focus:border-orange-400 focus:ring-orange-400"
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-2xl shadow-lg"
          disabled={!otp.every((digit) => digit !== "")}
        >
          Verify OTP
        </Button>

        {/* Resend Timer */}
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-orange-600">
              Resend OTP in 00:{timer.toString().padStart(2, "0")}
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-4"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
