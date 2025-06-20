import AgricultureMap from "@/components/agriculture-map"

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">農業マップ</h1>
          <p className="text-center mt-2 text-green-100">△△地区の農地分布と作物情報</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AgricultureMap />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 鳥取県○○町△△地区. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
