"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wheat, Carrot, Grape, TreePine } from "lucide-react"

interface LandArea {
  id: string
  name: string
  type: "rice" | "vegetable" | "fruit" | "forest" | "residential"
  crops: string[]
  area: string
  owner: string
  description: string
  coordinates: { x: number; y: number; width: number; height: number }
}

const landAreas: LandArea[] = [
  {
    id: "1",
    name: "北部水田地区",
    type: "rice",
    crops: ["コシヒカリ", "ひとめぼれ"],
    area: "15ha",
    owner: "田中農場",
    description: "地区最大の水田エリア。良質な米の生産地として知られています。",
    coordinates: { x: 10, y: 10, width: 180, height: 80 },
  },
  {
    id: "2",
    name: "中央野菜畑",
    type: "vegetable",
    crops: ["白ネギ", "大根", "キャベツ"],
    area: "8ha",
    owner: "山田農園",
    description: "季節野菜を中心とした露地栽培を行っています。",
    coordinates: { x: 200, y: 30, width: 120, height: 100 },
  },
  {
    id: "3",
    name: "南部果樹園",
    type: "fruit",
    crops: ["梨", "柿", "ぶどう"],
    area: "12ha",
    owner: "佐藤果樹園",
    description: "鳥取の特産品である梨を中心とした果樹栽培を行っています。",
    coordinates: { x: 50, y: 150, width: 150, height: 90 },
  },
  {
    id: "4",
    name: "東部水田",
    type: "rice",
    crops: ["コシヒカリ"],
    area: "6ha",
    owner: "鈴木農場",
    description: "有機栽培にこだわった米作りを行っています。",
    coordinates: { x: 330, y: 50, width: 100, height: 70 },
  },
  {
    id: "5",
    name: "西部野菜ハウス",
    type: "vegetable",
    crops: ["トマト", "きゅうり", "ピーマン"],
    area: "3ha",
    owner: "高橋園芸",
    description: "ハウス栽培による年間を通じた野菜生産を行っています。",
    coordinates: { x: 250, y: 180, width: 80, height: 60 },
  },
  {
    id: "6",
    name: "山林地区",
    type: "forest",
    crops: ["杉", "ヒノキ"],
    area: "25ha",
    owner: "地区共有林",
    description: "地区の水源涵養と木材生産を担う重要な森林です。",
    coordinates: { x: 350, y: 150, width: 120, height: 120 },
  },
  {
    id: "7",
    name: "住宅地区",
    type: "residential",
    crops: [],
    area: "5ha",
    owner: "住宅地",
    description: "地区住民の居住エリアです。",
    coordinates: { x: 150, y: 280, width: 100, height: 50 },
  },
]

const getAreaColor = (type: string) => {
  switch (type) {
    case "rice":
      return "#4ade80" // 緑
    case "vegetable":
      return "#fb923c" // オレンジ
    case "fruit":
      return "#f472b6" // ピンク
    case "forest":
      return "#22c55e" // 濃い緑
    case "residential":
      return "#94a3b8" // グレー
    default:
      return "#e5e7eb"
  }
}

const getAreaIcon = (type: string) => {
  switch (type) {
    case "rice":
      return <Wheat className="h-4 w-4" />
    case "vegetable":
      return <Carrot className="h-4 w-4" />
    case "fruit":
      return <Grape className="h-4 w-4" />
    case "forest":
      return <TreePine className="h-4 w-4" />
    case "residential":
      return <MapPin className="h-4 w-4" />
    default:
      return <MapPin className="h-4 w-4" />
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "rice":
      return "水田"
    case "vegetable":
      return "野菜畑"
    case "fruit":
      return "果樹園"
    case "forest":
      return "山林"
    case "residential":
      return "住宅地"
    default:
      return "その他"
  }
}

export default function AgricultureMap() {
  const [selectedArea, setSelectedArea] = useState<LandArea | null>(null)
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">△△地区 農業マップ</h2>
        <p className="text-gray-600">各エリアをクリックすると詳細情報が表示されます</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                地区全体図
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <svg
                  width="500"
                  height="350"
                  viewBox="0 0 500 350"
                  className="w-full h-auto border rounded-lg bg-green-50"
                >
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Roads */}
                  <path d="M 0 120 L 500 120" stroke="#6b7280" strokeWidth="8" opacity="0.7" />
                  <path d="M 200 0 L 200 350" stroke="#6b7280" strokeWidth="6" opacity="0.7" />

                  {/* Land areas */}
                  {landAreas.map((area) => (
                    <rect
                      key={area.id}
                      x={area.coordinates.x}
                      y={area.coordinates.y}
                      width={area.coordinates.width}
                      height={area.coordinates.height}
                      fill={getAreaColor(area.type)}
                      stroke={hoveredArea === area.id ? "#1f2937" : "#374151"}
                      strokeWidth={hoveredArea === area.id ? "3" : "1"}
                      opacity={hoveredArea === area.id ? "0.9" : "0.7"}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                      onClick={() => setSelectedArea(area)}
                    />
                  ))}

                  {/* Area labels */}
                  {landAreas.map((area) => (
                    <text
                      key={`label-${area.id}`}
                      x={area.coordinates.x + area.coordinates.width / 2}
                      y={area.coordinates.y + area.coordinates.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-semibold fill-gray-800 pointer-events-none"
                    >
                      {area.name}
                    </text>
                  ))}

                  {/* Compass */}
                  <g transform="translate(450, 30)">
                    <circle cx="0" cy="0" r="20" fill="white" stroke="#374151" strokeWidth="2" />
                    <path d="M 0 -15 L 5 0 L 0 15 L -5 0 Z" fill="#ef4444" />
                    <text x="0" y="-25" textAnchor="middle" className="text-xs font-bold fill-gray-800">
                      N
                    </text>
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legend and Details */}
        <div className="space-y-4">
          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>凡例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["rice", "vegetable", "fruit", "forest", "residential"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border" style={{ backgroundColor: getAreaColor(type) }} />
                    <span className="text-sm">{getTypeLabel(type)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Area Details */}
          {selectedArea && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getAreaIcon(selectedArea.type)}
                  {selectedArea.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Badge variant="secondary">{getTypeLabel(selectedArea.type)}</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>面積:</strong> {selectedArea.area}
                    </p>
                    <p>
                      <strong>管理者:</strong> {selectedArea.owner}
                    </p>
                    {selectedArea.crops.length > 0 && (
                      <div>
                        <strong>栽培作物:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedArea.crops.map((crop, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-gray-600">{selectedArea.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>農地統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>水田:</span>
                  <span className="font-semibold">21ha</span>
                </div>
                <div className="flex justify-between">
                  <span>野菜畑:</span>
                  <span className="font-semibold">11ha</span>
                </div>
                <div className="flex justify-between">
                  <span>果樹園:</span>
                  <span className="font-semibold">12ha</span>
                </div>
                <div className="flex justify-between">
                  <span>山林:</span>
                  <span className="font-semibold">25ha</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>総面積:</span>
                  <span>74ha</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Area List */}
      <Card>
        <CardHeader>
          <CardTitle>農地一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {landAreas
              .filter((area) => area.type !== "residential")
              .map((area) => (
                <div
                  key={area.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedArea(area)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {getAreaIcon(area.type)}
                    <h4 className="font-semibold text-sm">{area.name}</h4>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>
                      {getTypeLabel(area.type)} • {area.area}
                    </p>
                    <p>{area.owner}</p>
                    {area.crops.length > 0 && <p>{area.crops.join("、")}</p>}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
