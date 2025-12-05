import { useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Search, Filter, Heart, List, Music2, Sparkles } from "lucide-react"
import BhajanDetail from "./bhajan-detail"

export default function BhajansTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBhajan, setSelectedBhajan] = useState<string | null>(null)

  const categories = [
    {
      title: "आरती",
      subtitle: "Aarti",
      gradient: "from-orange-400 to-red-500",
    },
    {
      title: "जिंदाराम",
      subtitle: "Jindaram",
      gradient: "from-yellow-400 to-orange-500",
    },
  ]

  const tags = [
    { label: "Favorites", icon: Heart },
    { label: "Playlists", icon: List },
    { label: "Nachne Vale", icon: Music2 },
    { label: "Vireh", icon: Sparkles },
    { label: "Amritvevle", icon: Sparkles },
  ]

  const bhajans = [
    {
      title: "दाता तेरे प्यार ने रोग ऐसा ला लिया",
      preview: "दाता तेरे प्यार ने रोग ऐसा ला लिया, ",
      category: "Aarti",
    },
    {
      title: "सोनी सी डगोरी वालिया ",
      preview: "सोनी सी डगोरी वालिया दिल तेरे तो बगैर नईयो लगदा",
      category: "Bhajan",
    },
    {
      title: "ओ गरीब नवाज ",
      preview: "ओ गरीब नवाज मेरी बांह फड़ ले",
      category: "Aarti",
    },
    {
      title: "राधे राधे गोविंद",
      preview: "Radhe radhe govind, govind radhe radhe...",
      category: "Bhajan",
    },
    {
      title: "शिव शंकर भोले",
      preview: "Shiv shankar bhole, bhole shiv shankar...",
      category: "Bhajan",
    },
    {
      title: "गुरु ब्रह्मा गुरु विष्णु",
      preview: "Guru brahma guru vishnu, guru devo maheshwara...",
      category: "Guru Bhajan",
    },
  ]

  const handleBhajanClick = (index: number) => {
    setSelectedBhajan(`bhajan${index + 1}`)
  }

  if (selectedBhajan) {
    return (
      <BhajanDetail
        bhajanId={selectedBhajan}
        onBack={() => setSelectedBhajan(null)}
      />
    )
  }

  return (
    <div className="flex-1 bg-orange-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-b-3xl px-6 pt-12 pb-8 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full" />
        <div className="absolute bottom-2 left-8 w-8 h-8 bg-white/15 rounded-full" />

        <div className="relative z-10">
          <h1
            className="text-xl font-bold text-center mb-2"
            style={{ fontFamily: "serif" }}
          >
            धन धन सतगुरु तेरा ही आसरा
          </h1>
          <p className="text-center text-orange-100 text-lg font-medium">
            Naman!
          </p>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search bhajans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white rounded-2xl border-orange-200 focus:border-orange-400"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-2xl border-orange-200 hover:bg-orange-50 bg-transparent"
          >
            <Filter className="w-5 h-5 text-orange-600" />
          </Button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`h-16 rounded-2xl bg-gradient-to-r ${category.gradient} p-4 flex items-center justify-center shadow-lg`}
            >
              <div className="text-center">
                <h3
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "serif" }}
                >
                  {category.title}
                </h3>
                <p className="text-white/80 text-sm">{category.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tag Pills */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {tags.map((tag, index) => {
            const Icon = tag.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 whitespace-nowrap bg-transparent"
              >
                <Icon className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">
                  {tag.label}
                </span>
              </Button>
            )
          })}
        </div>

        {/* Bhajan Grid */}
        <div className="grid grid-cols-2 gap-4 pb-6">
          {bhajans.map((bhajan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleBhajanClick(index)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <Music2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-orange-600 font-medium">
                  {bhajan.category}
                </span>
              </div>
              <h3
                className="font-bold text-gray-800 mb-1 text-sm"
                style={{ fontFamily: "serif" }}
              >
                {bhajan.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {bhajan.preview}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
