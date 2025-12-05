import { Switch } from "../components/ui/switch"
import { 
  User, Phone, Download, Bell, Moon, LogOut, ChevronRight, Settings, MapPin 
} from "lucide-react"

interface ProfileTabProps {
  phoneNumber: string
  isGuest: boolean
  userDetails?: { firstName: string; lastName: string; place: string }
  onLogout: () => void
}

export default function ProfileTab({ phoneNumber, isGuest, userDetails, onLogout }: ProfileTabProps) {
  return (
    <div className="flex-1 bg-orange-50 p-6">
      {/* Header */}
      <div className="pt-8 mb-8">
        <h1 className="text-2xl font-bold text-orange-800 mb-6">Profile</h1>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {isGuest
                  ? "Guest User"
                  : userDetails
                  ? `${userDetails.firstName} ${userDetails.lastName}`
                  : "Devotee"}
              </h2>

              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{isGuest ? "Not logged in" : phoneNumber}</span>
              </div>

              {userDetails?.place && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{userDetails.place}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="p-4 border-b border-orange-50">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Settings className="w-5 h-5 text-orange-600" />
              Preferences
            </h3>
          </div>

          <div className="divide-y divide-orange-50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Dark Mode</span>
              </div>
              <Switch />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="p-4 border-b border-orange-50">
            <h3 className="font-semibold text-gray-800">Content</h3>
          </div>

          <button className="w-full p-4 flex items-center justify-between hover:bg-orange-25 transition-colors">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Downloaded Bhajans</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">12 items</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="p-4 border-b border-orange-50">
            <h3 className="font-semibold text-gray-800">Account</h3>
          </div>

          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center gap-3 hover:bg-red-25 transition-colors text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{isGuest ? "Exit Guest Mode" : "Log Out"}</span>
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-1">भजन संग्रह</p>
        <p className="text-xs text-gray-400">Version 1.0.0</p>
      </div>
    </div>
  )
}
