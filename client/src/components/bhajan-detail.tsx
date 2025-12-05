import { Button } from "../components/ui/button"
import { ArrowLeft, Play, Heart, Share, Download } from "lucide-react"

interface BhajanDetailProps {
  bhajanId: string
  onBack: () => void
}

export default function BhajanDetail({ bhajanId, onBack }: BhajanDetailProps) {
  // Mock data for now
  const bhajanData = {
    bhajan1: {
      title: "दाता तेरे प्यार ने रोग ऐसा ला लिया",
      category: "Nachne vale",
      lyrics: `दाता तेरे प्यार ने रोग ऐसा ला लिया
वाह रे दाताजी तूने पागल बना दिया
पहली बारी आई थी मैं दाताजी दे बेड़े विच
दूजी बारी आई थी मैं दाताजी दे गेडे विच
तीजी बारी दाताजी ने जाल बिछा दिया
वाह रे दाताजी तूने पागल बना दिया
`,
    },
    bhajan2: {
      title: "सोनी सी डगोरी वालिया दिल तेरे तो बगैर नईयो लगदा",
      category: "Bhajan",
      lyrics: `सोनी सी डगोरी वालिया दिल तेरे तो बगैर नईयो लगदा
प्यारे प्यारे प्यारे दातिया दिल तेरे तो बगैर नईयो लगदा
`,
    },
    bhajan3: {
      title: "ओ गरीब नवाज मेरी बांह फड़ ले",
      category: "Medium Paced Bhajan",
      lyrics: `ओ गरीब नवाज मेरी बांह फड़ ले,
मैनू पार करन दी वे हामी भर ले
`,
    },
  }

  const bhajan =
    bhajanData[bhajanId as keyof typeof bhajanData] || bhajanData.bhajan1

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ fontFamily: "serif" }}>
              {bhajan.title}
            </h1>
            <p className="text-orange-100 text-sm">{bhajan.category}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Play className="w-5 h-5 mr-2" />
            Play
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <Heart className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <Share className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Lyrics */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-lg font-semibold text-orange-800 mb-4">Lyrics</h2>

          <div className="space-y-4">
            {bhajan.lyrics.split("\n").map((line, index) => (
              <p
                key={index}
                className={`${line.trim() === "" ? "h-2" : "text-gray-700 leading-relaxed"}`}
                style={{
                  fontFamily:
                    line.includes("राम") || line.includes("कृष्ण")
                      ? "serif"
                      : "inherit",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-orange-800 mb-3">
            About this Bhajan
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Category:</span> {bhajan.category}
            </p>
            <p>
              <span className="font-medium">Language:</span> Hindi/Sanskrit
            </p>
            <p>
              <span className="font-medium">Duration:</span> 4:30 mins
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
