"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Wheat, Carrot, Grape, TreePine, Sparkles, Star } from "lucide-react"

interface LandArea {
  id: string
  name: string
  type: "rice" | "vegetable" | "fruit" | "forest" | "residential"
  crops: string[]
  area: string
  owner: string
  description: string
  coordinates: { x: number; y: number; width: number; height: number }
  level: number
  experience: number
  isActive: boolean
  currentStep: string
  stepProgress: number // 0-100%
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
    level: 5,
    experience: 750,
    isActive: true,
    currentStep: "水管理",
    stepProgress: 65,
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
    level: 3,
    experience: 420,
    isActive: true,
    currentStep: "収穫",
    stepProgress: 80,
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
    level: 4,
    experience: 680,
    isActive: true,
    currentStep: "摘果",
    stepProgress: 45,
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
    level: 2,
    experience: 180,
    isActive: false,
    currentStep: "休耕",
    stepProgress: 0,
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
    level: 6,
    experience: 920,
    isActive: true,
    currentStep: "育成管理",
    stepProgress: 30,
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
    level: 1,
    experience: 50,
    isActive: true,
    currentStep: "間伐",
    stepProgress: 20,
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
    level: 0,
    experience: 0,
    isActive: false,
    currentStep: "-",
    stepProgress: 0,
  },
]

// 総面積を計算する関数を追加
const getTotalArea = () => {
  return landAreas
    .filter((area) => area.type !== "residential")
    .reduce((total, area) => {
      const areaValue = Number.parseFloat(area.area.replace("ha", ""))
      return total + areaValue
    }, 0)
}

// 農業ステップの定義を追加（ゲームっぽいアイコンと説明付き）
const getWorkSteps = (type: string) => {
  switch (type) {
    case "rice":
      return [
        {
          name: "田起こし",
          icon: "🚜",
          description: "田んぼの土を耕して、稲作の準備をします。土を柔らかくして水はけを良くする大切な作業です。",
        },
        {
          name: "代かき",
          icon: "💧",
          description: "田んぼに水を入れて土をかき混ぜ、平らにします。苗がしっかり根付くための土台作りです。",
        },
        {
          name: "田植え",
          icon: "🌱",
          description: "育てた稲の苗を田んぼに植えます。等間隔に丁寧に植えることで、美味しいお米が育ちます。",
        },
        {
          name: "水管理",
          icon: "🌊",
          description: "稲の成長に合わせて田んぼの水位を調整します。適切な水管理が良質な米作りの秘訣です。",
        },
        {
          name: "除草",
          icon: "🌿",
          description: "稲の成長を妨げる雑草を取り除きます。手作業や機械を使って丁寧に行います。",
        },
        {
          name: "収穫",
          icon: "🌾",
          description: "黄金色に実った稲を刈り取ります。タイミングが重要で、美味しいお米の決め手となります。",
        },
        {
          name: "乾燥",
          icon: "☀️",
          description: "収穫した稲を適切に乾燥させます。水分量を調整して、長期保存できる状態にします。",
        },
      ]
    case "vegetable":
      return [
        {
          name: "土作り",
          icon: "🪨",
          description: "野菜が育ちやすい土壌を作ります。堆肥や肥料を混ぜて、栄養豊富な土にします。",
        },
        {
          name: "種まき",
          icon: "🌰",
          description: "野菜の種を適切な間隔で蒔きます。種類によって深さや間隔を調整します。",
        },
        { name: "育苗", icon: "🌱", description: "種から芽が出た苗を大切に育てます。温度や水分管理が重要です。" },
        {
          name: "定植",
          icon: "🪴",
          description: "育った苗を本格的な畑に植え替えます。根を傷つけないよう慎重に行います。",
        },
        {
          name: "管理",
          icon: "💚",
          description: "野菜の成長を見守り、水やりや追肥を行います。病気や害虫のチェックも大切です。",
        },
        {
          name: "収穫",
          icon: "🥕",
          description: "美味しく育った野菜を収穫します。最適なタイミングで収穫することで美味しさが決まります。",
        },
      ]
    case "fruit":
      return [
        {
          name: "剪定",
          icon: "✂️",
          description: "果樹の枝を切って形を整えます。日当たりや風通しを良くして、良い実をつけるための作業です。",
        },
        {
          name: "開花",
          icon: "🌸",
          description: "美しい花が咲く時期です。受粉がうまくいくよう、ミツバチなどの手助けも大切です。",
        },
        {
          name: "摘果",
          icon: "🍃",
          description: "余分な実を取り除いて、残った実に栄養を集中させます。大きくて美味しい果実を作るコツです。",
        },
        {
          name: "育成",
          icon: "🌳",
          description: "果実がゆっくりと成長する時期です。水やりや肥料で栄養を与え、大切に育てます。",
        },
        {
          name: "収穫",
          icon: "🍐",
          description: "甘くて美味しい果実を収穫します。完熟のタイミングを見極めるのが職人の技です。",
        },
      ]
    case "forest":
      return [
        {
          name: "植林",
          icon: "🌲",
          description: "新しい木を植えて森を育てます。将来の木材資源や環境保護のための大切な作業です。",
        },
        {
          name: "育成",
          icon: "🌳",
          description: "植えた木が健康に育つよう管理します。下草刈りや施肥で成長を助けます。",
        },
        {
          name: "間伐",
          icon: "🪓",
          description: "密集した木を適度に伐採して、残った木がよく育つようにします。森の健康管理です。",
        },
        {
          name: "伐採",
          icon: "🪵",
          description: "成長した木を木材として利用するために伐採します。計画的に行い、森の循環を保ちます。",
        },
      ]
    default:
      return []
  }
}

const getCurrentStepIndex = (area: LandArea) => {
  const steps = getWorkSteps(area.type)
  return steps.findIndex((step) => step.name === area.currentStep)
}

const getAreaColor = (type: string, level: number, isActive: boolean) => {
  const baseColors = {
    rice: "#4ade80",
    vegetable: "#fb923c",
    fruit: "#f472b6",
    forest: "#22c55e",
    residential: "#94a3b8",
  }

  const color = baseColors[type as keyof typeof baseColors] || "#e5e7eb"

  if (!isActive) {
    return "#9ca3af" // グレーアウト
  }

  // レベルに応じて明度を調整
  const brightness = Math.min(1 + level * 0.1, 1.5)
  return color
}

const getStepColor = (stepProgress: number) => {
  if (stepProgress >= 80) return "#10b981" // 緑 - 完了間近
  if (stepProgress >= 50) return "#f59e0b" // オレンジ - 進行中
  if (stepProgress >= 20) return "#3b82f6" // 青 - 開始
  return "#6b7280" // グレー - 準備中
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

export default function GameAgricultureMap() {
  const [selectedArea, setSelectedArea] = useState<LandArea | null>(null)
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)
  const [animatingArea, setAnimatingArea] = useState<string | null>(null)
  const [totalArea, setTotalArea] = useState(0)
  const [clickedStep, setClickedStep] = useState<{ areaId: string; stepName: string; description: string } | null>(null)

  useEffect(() => {
    const area = getTotalArea()
    setTotalArea(area)
  }, [])

  const handleAreaClick = (area: LandArea) => {
    setSelectedArea(area)
    setAnimatingArea(area.id)
    setTimeout(() => setAnimatingArea(null), 600)
  }

  const getLevelColor = (level: number) => {
    if (level >= 5) return "text-yellow-500"
    if (level >= 3) return "text-blue-500"
    if (level >= 1) return "text-green-500"
    return "text-gray-400"
  }

  const getLevelStars = (level: number) => {
    return Array.from({ length: Math.min(level, 5) }, (_, i) => <Star key={i} className="h-3 w-3 fill-current" />)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">農業マップ</h2>
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>
        <div className="flex items-center justify-center gap-4 mb-2">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <MapPin className="h-4 w-4 mr-2" />
            総面積: {totalArea}ha
          </Badge>
        </div>
        <p className="text-gray-600">各農地をクリックして詳細を確認しよう！</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Game Map */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />🌾 全体図 🌾
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100">
                <svg width="500" height="350" viewBox="0 0 500 350" className="w-full h-auto">
                  {/* Background pattern */}
                  <defs>
                    <filter id="paperNoise" x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence baseFrequency="0.9" numOctaves="1" result="noise" seed="1" />
                      <feColorMatrix in="noise" type="saturate" values="0" />
                      <feComponentTransfer>
                        <feFuncA type="discrete" tableValues="0.2 0.4 0.6 0.8" />
                      </feComponentTransfer>
                      <feComposite operator="over" in2="SourceGraphic" />
                    </filter>

                    <filter id="subtleNoise" x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence baseFrequency="0.6" numOctaves="2" result="noise" seed="2" />
                      <feColorMatrix in="noise" type="saturate" values="0" />
                      <feComponentTransfer>
                        <feFuncA type="discrete" tableValues="0.1 0.2 0.3" />
                      </feComponentTransfer>
                      <feComposite operator="multiply" in2="SourceGraphic" />
                    </filter>

                    <filter id="textNoise" x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence baseFrequency="1.2" numOctaves="1" result="noise" seed="3" />
                      <feColorMatrix in="noise" type="saturate" values="0" />
                      <feComponentTransfer>
                        <feFuncA type="discrete" tableValues="0.05 0.1 0.15" />
                      </feComponentTransfer>
                      <feComposite operator="screen" in2="SourceGraphic" />
                    </filter>

                    <pattern id="organicNoise" width="100" height="100" patternUnits="userSpaceOnUse">
                      <rect width="100" height="100" fill="rgba(34, 197, 94, 0.1)" />
                      <circle cx="20" cy="20" r="2" fill="rgba(34, 197, 94, 0.8)" />
                      <circle cx="80" cy="60" r="1.5" fill="rgba(34, 197, 94, 0.7)" opacity="0.9" />
                      <circle cx="50" cy="90" r="1" fill="rgba(34, 197, 94, 0.6)" opacity="0.8" />
                      <circle cx="10" cy="70" r="0.8" fill="rgba(34, 197, 94, 0.5)" opacity="0.9" />
                      <circle cx="90" cy="30" r="1.2" fill="rgba(34, 197, 94, 0.9)" opacity="0.8" />
                      <rect x="30" y="40" width="2" height="2" fill="rgba(34, 197, 94, 0.8)" opacity="0.7" />
                      <rect x="70" y="80" width="1.5" height="1.5" fill="rgba(34, 197, 94, 0.7)" opacity="0.8" />
                      <circle cx="40" cy="20" r="0.5" fill="rgba(34, 197, 94, 0.6)" opacity="0.9" />
                      <circle cx="75" cy="45" r="0.8" fill="rgba(34, 197, 94, 0.8)" opacity="0.7" />
                    </pattern>
                    <pattern id="gameGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="rgba(34, 197, 94, 0.1)" />
                      <circle cx="20" cy="20" r="2" fill="rgba(34, 197, 94, 0.3)" />
                    </pattern>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="rainbow">
                      <feColorMatrix type="hueRotate" values="0" result="rainbow">
                        <animateTransform
                          attributeName="values"
                          type="hueRotate"
                          values="0;360;0"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </feColorMatrix>
                    </filter>
                  </defs>
                  <style>
                    {`
  @keyframes verySubtleWork {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(-2px); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
@keyframes slowPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes slowBorderPulse {
  0%, 100% { 
    border-color: #047857;
  }
  50% { 
    border-color: #6ee7b7;
  }
}
`}
                  </style>
                  <rect width="100%" height="100%" fill="url(#organicNoise)" filter="url(#paperNoise)" />

                  {/* Animated clouds */}
                  <g className="animate-pulse">
                    <ellipse cx="100" cy="30" rx="25" ry="15" fill="rgba(255, 255, 255, 0.8)" />
                    <ellipse cx="300" cy="50" rx="30" ry="18" fill="rgba(255, 255, 255, 0.7)" />
                    <ellipse cx="450" cy="40" rx="20" ry="12" fill="rgba(255, 255, 255, 0.6)" />
                  </g>

                  {/* Roads with game-style design */}
                  <path d="M 0 120 L 500 120" stroke="#8b5a2b" strokeWidth="12" opacity="0.8" />
                  <path d="M 0 120 L 500 120" stroke="#d4a574" strokeWidth="8" opacity="0.9" />
                  <path d="M 200 0 L 200 350" stroke="#8b5a2b" strokeWidth="10" opacity="0.8" />
                  <path d="M 200 0 L 200 350" stroke="#d4a574" strokeWidth="6" opacity="0.9" />

                  {/* Land areas with game effects */}
                  {landAreas.map((area) => (
                    <g key={area.id}>
                      <rect
                        x={area.coordinates.x}
                        y={area.coordinates.y}
                        width={area.coordinates.width}
                        height={area.coordinates.height}
                        fill={getAreaColor(area.type, area.level, area.isActive)}
                        stroke={hoveredArea === area.id ? "#fbbf24" : "#374151"}
                        strokeWidth={hoveredArea === area.id ? "4" : "2"}
                        opacity={area.isActive ? "0.9" : "0.5"}
                        className={`cursor-pointer transition-all duration-300 ${
                          animatingArea === area.id ? "animate-bounce" : ""
                        } ${hoveredArea === area.id ? "drop-shadow-lg" : ""}`}
                        filter={`${area.isActive && hoveredArea === area.id ? "url(#glow)" : ""} url(#subtleNoise)`}
                        onMouseEnter={() => setHoveredArea(area.id)}
                        onMouseLeave={() => setHoveredArea(null)}
                        onClick={() => handleAreaClick(area)}
                      />

                      {/* Area name with game styling */}
                      <text
                        x={area.coordinates.x + area.coordinates.width / 2}
                        y={area.coordinates.y + area.coordinates.height / 2 - 5}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-bold fill-gray-800 pointer-events-none drop-shadow-sm"
                        style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}
                        filter="url(#textNoise)"
                      >
                        {area.name}
                      </text>

                      {/* Progress bar */}
                      {area.isActive && area.stepProgress > 0 && (
                        <g>
                          <rect
                            x={area.coordinates.x + area.coordinates.width / 2 - 20}
                            y={area.coordinates.y + area.coordinates.height / 2 + 20}
                            width="40"
                            height="4"
                            fill="rgba(255, 255, 255, 0.7)"
                            rx="2"
                          />
                          <rect
                            x={area.coordinates.x + area.coordinates.width / 2 - 20}
                            y={area.coordinates.y + area.coordinates.height / 2 + 20}
                            width={40 * (area.stepProgress / 100)}
                            height="4"
                            fill={getStepColor(area.stepProgress)}
                            rx="2"
                          />
                        </g>
                      )}

                      {/* Activity indicator */}
                      {area.isActive && (
                        <circle
                          cx={area.coordinates.x + 10}
                          cy={area.coordinates.y + 10}
                          r="4"
                          fill="#10b981"
                          className="animate-pulse"
                        />
                      )}

                      {/* Game-style work steps */}
                      {area.isActive && area.currentStep !== "-" && (
                        <g>
                          {getWorkSteps(area.type)
                            .reverse()
                            .map((step, index) => {
                              const originalIndex = getWorkSteps(area.type).length - 1 - index
                              const currentIndex = getCurrentStepIndex(area)
                              const isCurrent = originalIndex === currentIndex
                              const isCompleted = originalIndex < currentIndex
                              const stepY = area.coordinates.y + 25 + index * 11
                              const stepX = area.coordinates.x + 8
                              const stepWidth = isCurrent ? 50 : 40
                              const stepHeight = isCurrent ? 12 : 10

                              return (
                                <g key={step.name}>
                                  {/* Step background with gradient */}
                                  <defs>
                                    <linearGradient
                                      id={`gradient-${area.id}-${index}`}
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="0%"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor={isCompleted ? "#10b981" : isCurrent ? "#f59e0b" : "#d1d5db"}
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor={isCompleted ? "#059669" : isCurrent ? "#d97706" : "#9ca3af"}
                                      />
                                    </linearGradient>
                                  </defs>
                                  <rect
                                    x={stepX}
                                    y={stepY - stepHeight / 2}
                                    width={stepWidth}
                                    height={stepHeight}
                                    fill={`url(#gradient-${area.id}-${index})`}
                                    stroke={isCurrent ? "#fbbf24" : "rgba(255, 255, 255, 0.9)"}
                                    strokeWidth={isCurrent ? "2" : "1"}
                                    rx="6"
                                    ry="6"
                                    className={`cursor-pointer transition-all duration-200 hover:opacity-80 ${isCurrent ? "" : ""}`}
                                    filter={isCurrent ? "url(#glow)" : ""}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setClickedStep({
                                        areaId: area.id,
                                        stepName: step.name,
                                        description: step.description,
                                      })
                                    }}
                                    style={{ animation: isCurrent ? "slowPulse 3s ease-in-out infinite" : "" }}
                                  />

                                  {/* Step icon */}
                                  <text
                                    x={stepX + 8}
                                    y={stepY + 1}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="pointer-events-none"
                                    fontSize="8"
                                  >
                                    {step.icon}
                                  </text>

                                  {/* Step text */}
                                  <text
                                    x={stepX + stepWidth / 2 + 4}
                                    y={stepY + 1}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="pointer-events-none font-bold fill-white"
                                    fontSize={isCurrent ? "7" : "6"}
                                    style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}
                                  >
                                    {step.name}
                                  </text>

                                  {/* Completed step checkmark */}
                                  {isCompleted && (
                                    <text
                                      x={stepX + stepWidth - 6}
                                      y={stepY + 1}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                      className="pointer-events-none fill-white"
                                      fontSize="8"
                                    >
                                      ✓
                                    </text>
                                  )}

                                  {/* Current step sparkle effect */}
                                  {isCurrent && (
                                    <>
                                      <circle
                                        cx={stepX - 3}
                                        cy={stepY - 6}
                                        r="1"
                                        fill="#fbbf24"
                                        style={{ animation: "sparkle 1s ease-in-out infinite" }}
                                      />
                                      <circle
                                        cx={stepX + stepWidth + 3}
                                        cy={stepY + 6}
                                        r="1"
                                        fill="#fbbf24"
                                        style={{ animation: "sparkle 1s ease-in-out infinite 0.5s" }}
                                      />
                                    </>
                                  )}
                                </g>
                              )
                            })}
                        </g>
                      )}

                      {/* Crop icons and worker animations */}
                      {area.isActive && (
                        <g>
                          {/* Crop icons */}
                          {area.type === "rice" && (
                            <>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 60}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-xl"
                              >
                                🌾
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 40}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-xl"
                              >
                                🌾
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 20}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-xl"
                              >
                                🌾
                              </text>
                            </>
                          )}

                          {area.type === "vegetable" && (
                            <>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 50}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-lg"
                              >
                                🥬
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 30}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-lg"
                              >
                                🥕
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 10}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-lg"
                              >
                                🥬
                              </text>
                            </>
                          )}

                          {area.type === "fruit" && (
                            <>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 50}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-xl"
                              >
                                🍐
                              </text>
                            </>
                          )}

                          {area.type === "forest" && (
                            <>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 40}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-2xl"
                              >
                                🌲
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 20}
                                y={area.coordinates.y + area.coordinates.height - 15}
                                className="text-2xl"
                              >
                                🌲
                              </text>
                            </>
                          )}

                          {/* Animated workers */}
                          {area.type === "rice" && (
                            <g>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 80}
                                y={area.coordinates.y + area.coordinates.height - 35}
                                className="text-2xl"
                                style={{
                                  animation: "verySubtleWork 4s ease-in-out infinite",
                                }}
                              >
                                👨‍🌾
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 75}
                                y={area.coordinates.y + area.coordinates.height - 30}
                                className="text-lg"
                              >
                                🚜
                              </text>
                            </g>
                          )}

                          {area.type === "vegetable" && (
                            <g>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 70}
                                y={area.coordinates.y + area.coordinates.height - 35}
                                className="text-2xl"
                                style={{
                                  animation: "verySubtleWork 3s ease-in-out infinite",
                                }}
                              >
                                👩‍🌾
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 65}
                                y={area.coordinates.y + area.coordinates.height - 25}
                                className="text-lg"
                              >
                                🥕
                              </text>
                            </g>
                          )}

                          {area.type === "fruit" && (
                            <g>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 75}
                                y={area.coordinates.y + area.coordinates.height - 35}
                                className="text-2xl"
                                style={{
                                  animation: "verySubtleWork 3.5s ease-in-out infinite",
                                }}
                              >
                                🧑‍🌾
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 70}
                                y={area.coordinates.y + area.coordinates.height - 25}
                                className="text-lg"
                              >
                                🧺
                              </text>
                            </g>
                          )}

                          {area.type === "forest" && (
                            <g>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 80}
                                y={area.coordinates.y + area.coordinates.height - 40}
                                className="text-2xl"
                                style={{
                                  animation: "verySubtleWork 4s ease-in-out infinite",
                                }}
                              >
                                🧑‍🌾
                              </text>
                              <text
                                x={area.coordinates.x + area.coordinates.width - 75}
                                y={area.coordinates.y + area.coordinates.height - 30}
                                className="text-lg"
                              >
                                🪵
                              </text>
                            </g>
                          )}
                        </g>
                      )}
                    </g>
                  ))}

                  {/* Compass with game styling */}
                  <g transform="translate(450, 30)">
                    <circle cx="0" cy="0" r="25" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
                    <path d="M 0 -18 L 6 0 L 0 18 L -6 0 Z" fill="#ef4444" />
                    <text x="0" y="-30" textAnchor="middle" className="text-sm font-bold fill-gray-800">
                      N
                    </text>
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Stats and Details */}
        <div className="space-y-4">
          {/* Legend with game styling */}
          <Card className="border-2 border-yellow-400">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
              <CardTitle>🎯 農地タイプ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["rice", "vegetable", "fruit", "forest", "residential"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border-2 border-gray-400"
                      style={{ backgroundColor: getAreaColor(type, 3, true) }}
                    />
                    <span className="text-sm font-medium">{getTypeLabel(type)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Area Details with game styling */}
          {selectedArea && (
            <Card className="border-2 border-blue-400 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                <CardTitle className="flex items-center gap-2">
                  {getAreaIcon(selectedArea.type)}
                  {selectedArea.name}
                  <div className={`flex ${getLevelColor(selectedArea.level)}`}>{getLevelStars(selectedArea.level)}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant={selectedArea.isActive ? "default" : "secondary"}>
                    {selectedArea.isActive ? "🟢 稼働中" : "⚪ 休止中"}
                  </Badge>
                  <Badge variant="outline">{getTypeLabel(selectedArea.type)}</Badge>
                </div>

                {/* Work step information with vertical steps */}
                {selectedArea.isActive && selectedArea.currentStep !== "-" && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border-2 border-blue-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">🎯 作業工程:</span>
                      <Badge
                        style={{
                          backgroundColor: getStepColor(selectedArea.stepProgress),
                          color: "white",
                          animation: "slowPulse 3s ease-in-out infinite",
                        }}
                      >
                        ✨ {selectedArea.currentStep}
                      </Badge>
                    </div>

                    {/* Vertical step display */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col-reverse gap-2">
                        {getWorkSteps(selectedArea.type).map((step, index) => {
                          const currentIndex = getCurrentStepIndex(selectedArea)
                          const isCurrent = index === currentIndex
                          const isCompleted = index < currentIndex

                          return (
                            <div
                              key={step.name}
                              className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 p-1 rounded transition-colors"
                              onClick={() =>
                                setClickedStep({
                                  areaId: selectedArea.id,
                                  stepName: step.name,
                                  description: step.description,
                                })
                              }
                            >
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  isCompleted
                                    ? "bg-green-500 border-green-500"
                                    : isCurrent
                                      ? "bg-orange-500 border-orange-500 animate-pulse"
                                      : "bg-gray-200 border-gray-300"
                                }`}
                              >
                                {isCompleted && <span className="text-white text-xs font-bold">✓</span>}
                                {isCurrent && <span className="text-white text-xs">⚡</span>}
                              </div>
                              <span className="text-sm mr-2">{step.icon}</span>
                              <span
                                className={`text-xs ${
                                  isCurrent
                                    ? "font-bold text-orange-600 text-sm"
                                    : isCompleted
                                      ? "font-medium text-green-600"
                                      : "text-gray-400"
                                }`}
                              >
                                {step.name}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-purple-500"
                        style={{
                          width: `${selectedArea.stepProgress}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                      <span>🎯 進捗:</span>
                      <span className="font-bold">{selectedArea.stepProgress}%</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      <strong>⭐ レベル:</strong>
                    </span>
                    <span className={`font-bold ${getLevelColor(selectedArea.level)}`}>Lv.{selectedArea.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      <strong>💎 経験値:</strong>
                    </span>
                    <span className="font-bold text-blue-600">{selectedArea.experience} EXP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      <strong>📏 面積:</strong>
                    </span>
                    <span>{selectedArea.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      <strong>👤 管理者:</strong>
                    </span>
                    <span>{selectedArea.owner}</span>
                  </div>
                  {selectedArea.crops.length > 0 && (
                    <div>
                      <strong>🌱 栽培作物:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedArea.crops.map((crop, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-gray-600 italic">📝 {selectedArea.description}</p>
                </div>

                {selectedArea.isActive && (
                  <Button
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                    style={{ animation: "slowPulse 3s ease-in-out infinite" }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />🚀 農地を訪問する
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step Description Popup */}
          {clickedStep && (
            <Card
              className="border-2 border-green-400 shadow-lg animate-in slide-in-from-bottom-4"
              style={{ animation: "slowBorderPulse 4s ease-in-out infinite" }}
            >
              <CardHeader className="bg-gradient-to-r from-green-400 to-teal-400 text-white pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">🎯 作業説明</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 h-6 w-6 p-0"
                    onClick={() => setClickedStep(null)}
                  >
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {
                        getWorkSteps(landAreas.find((a) => a.id === clickedStep.areaId)?.type || "").find(
                          (s) => s.name === clickedStep.stepName,
                        )?.icon
                      }
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-green-700">{clickedStep.stepName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {landAreas.find((a) => a.id === clickedStep.areaId)?.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700 leading-relaxed">{clickedStep.description}</p>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    💡 ヒント: 他のステップもクリックして詳細を確認してみよう！
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
