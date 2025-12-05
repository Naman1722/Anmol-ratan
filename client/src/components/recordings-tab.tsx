import { Play, Shuffle } from "lucide-react"
import { Button } from "../components/ui/button"

export default function RecordingsTab() {
  const recordings = [
    {
      title: "Morning Aarti Session",
      duration: "15:30",
      date: "Today",
    },
    {
      title: "Evening Bhajan",
      duration: "22:45",
      date: "Yesterday",
    },
    {
      title: "Guru Purnima Special",
      duration: "45:20",
      date: "2 days ago",
    },
    {
      title: "Krishna Janmashtami",
      duration: "38:15",
      date: "1 week ago",
    },
    {
      title: "Shiv Bhajan Collection",
      duration: "28:30",
      date: "2 weeks ago",
    },
    {
      title: "Ram Navami Celebration",
      duration: "52:10",
      date: "1 month ago",
    },
  ]

  return (
    <div className="flex-1 bg-cream-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-8">
        <h1 className="text-2xl font-bold text-orange-800">My Recordings</h1>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-orange-200 hover:bg-orange-50 bg-transparent"
        >
          <Shuffle className="w-5 h-5 text-orange-600" />
        </Button>
      </div>

      {/* Recordings Grid */}
      <div className="grid grid-cols-2 gap-4">
        {recordings.map((recording, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full" />

            <div className="relative z-10">
              {/* Play Button */}
              <div className="flex items-center justify-between mb-3">
                <Button
                  size="icon"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg"
                >
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </Button>
                <div className="text-right">
                  <div className="text-xs text-orange-600 font-medium">
                    {recording.date}
                  </div>
                </div>
              </div>

              {/* Recording Info */}
              <h3 className="font-bold text-gray-800 mb-2 text-sm leading-tight">
                {recording.title}
              </h3>

              {/* Waveform visualization */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-orange-300 rounded-full"
                    style={{
                      width: "2px",
                      height: `${Math.random() * 16 + 4}px`,
                    }}
                  />
                ))}
              </div>

              <div className="text-xs text-gray-500 font-medium">
                {recording.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for new users */}
      {recordings.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No recordings yet
          </h3>
          <p className="text-gray-500">Start recording your favorite bhajans</p>
        </div>
      )}
    </div>
  )
}
