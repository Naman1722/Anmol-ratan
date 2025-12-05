import { useState } from "react"
import BhajansTab from "./bhajans-tab"
import RecordingsTab from "./recordings-tab"
import ProfileTab from "./profile-tab"
import { Music, Mic, User } from "lucide-react"

interface DashboardProps {
  phoneNumber: string
  isGuest: boolean
  userDetails?: { firstName: string; lastName: string; place: string }
  onLogout: () => void
}

type TabId = "bhajans" | "recordings" | "profile"

export default function Dashboard({ phoneNumber, isGuest, userDetails, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("bhajans")

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "bhajans", label: "Bhajans", icon: Music },
    { id: "recordings", label: "Recordings", icon: Mic },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "bhajans" && <BhajansTab />}
        {activeTab === "recordings" && <RecordingsTab />}
        {activeTab === "profile" && (
          <ProfileTab
            phoneNumber={phoneNumber}
            isGuest={isGuest}
            userDetails={userDetails}
            onLogout={onLogout}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-orange-100 px-4 py-2 safe-area-pb">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                  isActive ? "text-orange-600 bg-orange-50" : "text-gray-500 hover:text-orange-500"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-orange-600" : ""}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
