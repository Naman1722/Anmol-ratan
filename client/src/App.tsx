import { useState } from "react";
import LoginPage from "./components/login-page";
import OTPPage from "./components/otp-page";
import UserDetailsPage from "./components/user-details-page";
import Dashboard from "./components/dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "login" | "otp" | "details" | "dashboard"
  >("login");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    place: string;
  } | null>(null);

  // LOGIN SUCCESS (phone OR guest)
  const handleLogin = (phone: string, guest?: boolean) => {
    if (guest) {
      setIsGuest(true);
      setPhoneNumber("");
      setCurrentScreen("dashboard");
      return;
    }

    setIsGuest(false);
    setPhoneNumber(phone);
    setCurrentScreen("otp");
  };

  // OTP VERIFIED
  const handleVerifyOtp = () => {
    setCurrentScreen("details");
  };

  // USER DETAILS COMPLETED
  const handleCompleteDetails = (details: {
    firstName: string;
    lastName: string;
    place: string;
  }) => {
    setUserDetails(details);
    setCurrentScreen("dashboard");
  };

  // LOGOUT
  const handleLogout = () => {
    setPhoneNumber("");
    setUserDetails(null);
    setIsGuest(false);
    setCurrentScreen("login");
  };

  // RENDER SCREENS
  if (currentScreen === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentScreen === "otp") {
    return <OTPPage phoneNumber={phoneNumber} onVerify={handleVerifyOtp} />;
  }

  if (currentScreen === "details") {
    return (
      <UserDetailsPage
        phoneNumber={phoneNumber}
        onComplete={handleCompleteDetails}
      />
    );
  }

  if (currentScreen === "dashboard") {
    return (
      <Dashboard
        phoneNumber={phoneNumber}
        isGuest={isGuest}
        userDetails={userDetails || undefined}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}
