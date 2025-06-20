"use client"
import jsPDF from "jspdf"
import GameAgricultureMap from "@/components/game-agriculture-map"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, FileText, Phone, Mail } from "lucide-react"

// Export functions
const exportToPDF = () => {
  const doc = new jsPDF("p", "mm", "a4")

  // Set font for Japanese text
  doc.setFont("helvetica")

  // Title
  doc.setFontSize(18)
  doc.text("△△農業組合規約", 20, 30)

  let yPosition = 50
  const lineHeight = 7
  const pageHeight = 280

  const addText = (text: string, fontSize = 12, isBold = false) => {
    if (yPosition > pageHeight) {
      doc.addPage()
      yPosition = 30
    }

    doc.setFontSize(fontSize)
    if (isBold) {
      doc.setFont("helvetica", "bold")
    } else {
      doc.setFont("helvetica", "normal")
    }

    const lines = doc.splitTextToSize(text, 170)
    doc.text(lines, 20, yPosition)
    yPosition += lines.length * lineHeight
  }

  // Content
  addText("第1章 総則", 14, true)
  addText("第1条（名称）", 12, true)
  addText("本組合は、△△農業組合と称する。")

  addText("第2条（目的）", 12, true)
  addText(
    "本組合は、組合員の相互扶助の精神に基づき、農業の発展と組合員の経済的・社会的地位の向上を図ることを目的とする。",
  )

  addText("第3条（事業）", 12, true)
  addText("本組合は、前条の目的を達成するため、次の事業を行う。")
  addText("・農業技術の向上に関する事業")
  addText("・農産物の共同販売に関する事業")
  addText("・農業資材の共同購入に関する事業")
  addText("・農業機械の共同利用に関する事業")
  addText("・その他目的達成に必要な事業")

  addText("第2章 組合員", 14, true)
  addText("第4条（組合員の資格）", 12, true)
  addText("本組合の組合員となることができる者は、△△地区内において農業を営む者とする。")

  addText("第5条（加入）", 12, true)
  addText("本組合に加入しようとする者は、加入申込書を組合長に提出し、理事会の承認を得なければならない。")

  addText("第6条（脱退）", 12, true)
  addText("組合員が脱退しようとするときは、脱退届を組合長に提出しなければならない。")

  addText("第3章 役員", 14, true)
  addText("第7条（役員）", 12, true)
  addText("本組合に次の役員を置く。")
  addText("・組合長　1名")
  addText("・副組合長　2名")
  addText("・理事　5名")
  addText("・監事　2名")

  addText("第8条（役員の選出）", 12, true)
  addText("役員は、総会において組合員の中から選出する。")

  addText("第9条（任期）", 12, true)
  addText("役員の任期は2年とし、再任を妨げない。")

  addText("第4章 総会", 14, true)
  addText("第10条（総会）", 12, true)
  addText("総会は、本組合の最高議決機関とする。")

  addText("第11条（総会の招集）", 12, true)
  addText("通常総会は、毎年1回開催する。臨時総会は、必要に応じて組合長が招集する。")

  addText("第5章 会計", 14, true)
  addText("第12条（経費）", 12, true)
  addText("本組合の経費は、組合費、事業収入その他の収入をもって充てる。")

  addText("第13条（組合費）", 12, true)
  addText("組合員は、総会で定める組合費を納入しなければならない。")

  addText("附則", 14, true)
  addText("この規約は、令和○年○月○日から施行する。")

  doc.save("農業組合規約.pdf")
}

const downloadFile = (content: string, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const exportToHTML = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>△△農業組合規約</title>
    <style>
        body { font-family: 'MS Gothic', monospace; line-height: 1.6; margin: 40px; }
        h1 { text-align: center; color: #2d5016; }
        h2 { color: #4a7c59; border-bottom: 2px solid #4a7c59; padding-bottom: 5px; }
        h3 { color: #2d5016; }
        ul { margin-left: 20px; }
        .article { margin-bottom: 15px; }
        .article-title { font-weight: bold; margin-bottom: 5px; }
    </style>
</head>
<body>
    <h1>△△農業組合規約</h1>
    
    <h2>第1章 総則</h2>
    <div class="article">
        <div class="article-title">第1条（名称）</div>
        <p>本組合は、△△農業組合と称する。</p>
    </div>
    
    <div class="article">
        <div class="article-title">第2条（目的）</div>
        <p>本組合は、組合員の相互扶助の精神に基づき、農業の発展と組合員の経済的・社会的地位の向上を図ることを目的とする。</p>
    </div>
    
    <div class="article">
        <div class="article-title">第3条（事業）</div>
        <p>本組合は、前条の目的を達成するため、次の事業を行う。</p>
        <ul>
            <li>農業技術の向上に関する事業</li>
            <li>農産物の共同販売に関する事業</li>
            <li>農業資材の共同購入に関する事業</li>
            <li>農業機械の共同利用に関する事業</li>
            <li>その他目的達成に必要な事業</li>
        </ul>
    </div>
    
    <h2>第2章 組合員</h2>
    <div class="article">
        <div class="article-title">第4条（組合員の資格）</div>
        <p>本組合の組合員となることができる者は、△△地区内において農業を営む者とする。</p>
    </div>
    
    <div class="article">
        <div class="article-title">第5条（加入）</div>
        <p>本組合に加入しようとする者は、加入申込書を組合長に提出し、理事会の承認を得なければならない。</p>
    </div>
    
    <div class="article">
        <div class="article-title">第6条（脱退）</div>
        <p>組合員が脱退しようとするときは、脱退届を組合長に提出しなければならない。</p>
    </div>
    
    <h2>第3章 役員</h2>
    <div class="article">
        <div class="article-title">第7条（役員）</div>
        <p>本組合に次の役員を置く。</p>
        <ul>
            <li>組合長　1名</li>
            <li>副組合長　2名</li>
            <li>理事　5名</li>
            <li>監事　2名</li>
        </ul>
    </div>
    
    <div class="article">
        <div class="article-title">第8条（役員の選出）</div>
        <p>役員は、総会において組合員の中から選出する。</p>
    </div>
    
    <div class="article">
        <div class="article-title">第9条（任期）</div>
        <p>役員の任期は2年とし、再任を妨げない。</p>
    </div>
    
    <h2>第4章 総会</h2>
    <div class="article">
        <div class="article-title">第10条（総会）</div>
        <p>総会は、本組合の最高議決機関とする。</p>
    </div>
    
    <div class="article">
        <div class="article-title">第11条（総会の招集）</div>
        <p>通常総会は、毎年1回開催する。臨時総会は、必要に応じて組合長が招集する。</p>
    </div>
    
    <h2>第5章 会計</h2>
    <div class="article">
        <div class="article-title">第12条（経費）</div>
        <p>本組合の経費は、組合費、事業収入その他の収入をもって充てる。</p>
    </div>
    
    <div class="article">
        <div class="article-title">第13条（組合費）</div>
        <p>組合員は、総会で定める組合費を納入しなければならない。</p>
    </div>
    
    <h2>附則</h2>
    <p>この規約は、令和○年○月○日から施行する。</p>
</body>
</html>`

  downloadFile(htmlContent, "農業組合規約.html", "text/html")
}

const exportToText = () => {
  const textContent = `△△農業組合規約

第1章 総則

第1条（名称）
本組合は、△△農業組合と称する。

第2条（目的）
本組合は、組合員の相互扶助の精神に基づき、農業の発展と組合員の経済的・社会的地位の向上を図ることを目的とする。

第3条（事業）
本組合は、前条の目的を達成するため、次の事業を行う。
・農業技術の向上に関する事業
・農産物の共同販売に関する事業
・農業資材の共同購入に関する事業
・農業機械の共同利用に関する事業
・その他目的達成に必要な事業

第2章 組合員

第4条（組合員の資格）
本組合の組合員となることができる者は、△△地区内において農業を営む者とする。

第5条（加入）
本組合に加入しようとする者は、加入申込書を組合長に提出し、理事会の承認を得なければならない。

第6条（脱退）
組合員が脱退しようとするときは、脱退届を組合長に提出しなければならない。

第3章 役員

第7条（役員）
本組合に次の役員を置く。
・組合長　1名
・副組合長　2名
・理事　5名
・監事　2名

第8条（役員の選出）
役員は、総会において組合員の中から選出する。

第9条（任期）
役員の任期は2年とし、再任を妨げない。

第4章 総会

第10条（総会）
総会は、本組合の最高議決機関とする。

第11条（総会の招集）
通常総会は、毎年1回開催する。臨時総会は、必要に応じて組合長が招集する。

第5章 会計

第12条（経費）
本組合の経費は、組合費、事業収入その他の収入をもって充てる。

第13条（組合費）
組合員は、総会で定める組合費を納入しなければならない。

附則
この規約は、令和○年○月○日から施行する。`

  downloadFile(textContent, "農業組合規約.txt", "text/plain;charset=utf-8")
}

const copyToClipboard = async () => {
  const textContent = `△△農業組合規約

第1章 総則

第1条（名称）
本組合は、△△農業組合と称する。

第2条（目的）
本組合は、組合員の相互扶助の精神に基づき、農業の発展と組合員の経済的・社会的地位の向上を図ることを目的とする。

第3条（事業）
本組合は、前条の目的を達成するため、次の事業を行う。
・農業技術の向上に関する事業
・農産物の共同販売に関する事業
・農業資材の共同購入に関する事業
・農業機械の共同利用に関する事業
・その他目的達成に必要な事業

第2章 組合員

第4条（組合員の資格）
本組合の組合員となることができる者は、△△地区内において農業を営む者とする。

第5条（加入）
本組合に加入しようとする者は、加入申込書を組合長に提出し、理事会の承認を得なければならない。

第6条（脱退）
組合員が脱退しようとするときは、脱退届を組合長に提出しなければならない。

第3章 役員

第7条（役員）
本組合に次の役員を置く。
・組合長　1名
・副組合長　2名
・理事　5名
・監事　2名

第8条（役員の選出）
役員は、総会において組合員の中から選出する。

第9条（任期）
役員の任期は2年とし、再任を妨げない。

第4章 総会

第10条（総会）
総会は、本組合の最高議決機関とする。

第11条（総会の招集）
通常総会は、毎年1回開催する。臨時総会は、必要に応じて組合長が招集する。

第5章 会計

第12条（経費）
本組合の経費は、組合費、事業収入その他の収入をもって充てる。

第13条（組合費）
組合員は、総会で定める組合費を納入しなければならない。

附則
この規約は、令和○年○月○日から施行する。`

  try {
    await navigator.clipboard.writeText(textContent)
    alert("規約をクリップボードにコピーしました！")
  } catch (err) {
    console.error("クリップボードへのコピーに失敗しました:", err)
    alert("クリップボードへのコピーに失敗しました。ブラウザが対応していない可能性があります。")
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">鳥取県○○町△△地区</h1>
          <p className="text-center mt-2 text-green-100">自然豊かな農村地域</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">△△地区へようこそ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            豊かな自然に囲まれた△△地区は、伝統的な農業を大切にしながら、
            地域住民が協力し合って暮らしている温かなコミュニティです。
          </p>
        </section>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Agricultural Cooperative Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                △△農業組合
              </CardTitle>
              <CardDescription>地域農業の発展と農家の相互扶助を目的とした組合</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                昭和○○年に設立され、現在○○戸の農家が加入しています。 米作りを中心とした農業振興に取り組んでいます。
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    組合規約を見る
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>△△農業組合規約</DialogTitle>
                    <DialogDescription>農業組合の運営に関する規約をご確認いただけます</DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2 mb-4">
                    <Button onClick={exportToPDF} variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      PDF出力
                    </Button>
                    <Button onClick={exportToHTML} variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      HTML出力
                    </Button>
                    <Button onClick={exportToText} variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      テキスト出力
                    </Button>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />📋 コピー
                    </Button>
                  </div>
                  <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">第1章 総則</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>第1条（名称）</strong>
                          </p>
                          <p>本組合は、△△農業組合と称する。</p>

                          <p>
                            <strong>第2条（目的）</strong>
                          </p>
                          <p>
                            本組合は、組合員の相互扶助の精神に基づき、農業の発展と組合員の経済的・社会的地位の向上を図ることを目的とする。
                          </p>

                          <p>
                            <strong>第3条（事業）</strong>
                          </p>
                          <p>本組合は、前条の目的を達成するため、次の事業を行う。</p>
                          <ul className="list-disc list-inside ml-4">
                            <li>農業技術の向上に関する事業</li>
                            <li>農産物の共同販売に関する事業</li>
                            <li>農産物の共同販売に関する事業</li>
                            <li>農業資材の共同購入に関する事業</li>
                            <li>農業機械の共同利用に関する事業</li>
                            <li>その他目的達成に必要な事業</li>
                          </ul>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-bold text-lg mb-2">第2章 組合員</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>第4条（組合員の資格）</strong>
                          </p>
                          <p>本組合の組合員となることができる者は、△△地区内において農業を営む者とする。</p>

                          <p>
                            <strong>第5条（加入）</strong>
                          </p>
                          <p>
                            本組合に加入しようとする者は、加入申込書を組合長に提出し、理事会の承認を得なければならない。
                          </p>

                          <p>
                            <strong>第6条（脱退）</strong>
                          </p>
                          <p>組合員が脱退しようとするときは、脱退届を組合長に提出しなければならない。</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-bold text-lg mb-2">第3章 役員</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>第7条（役員）</strong>
                          </p>
                          <p>本組合に次の役員を置く。</p>
                          <ul className="list-disc list-inside ml-4">
                            <li>組合長　1名</li>
                            <li>副組合長　2名</li>
                            <li>理事　5名</li>
                            <li>監事　2名</li>
                          </ul>

                          <p>
                            <strong>第8条（役員の選出）</strong>
                          </p>
                          <p>役員は、総会において組合員の中から選出する。</p>

                          <p>
                            <strong>第9条（任期）</strong>
                          </p>
                          <p>役員の任期は2年とし、再任を妨げない。</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-bold text-lg mb-2">第4章 総会</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>第10条（総会）</strong>
                          </p>
                          <p>総会は、本組合の最高議決機関とする。</p>

                          <p>
                            <strong>第11条（総会の招集）</strong>
                          </p>
                          <p>通常総会は、毎年1回開催する。臨時総会は、必要に応じて組合長が招集する。</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-bold text-lg mb-2">第5章 会計</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>第12条（経費）</strong>
                          </p>
                          <p>本組合の経費は、組合費、事業収入その他の収入をもって充てる。</p>

                          <p>
                            <strong>第13条（組合費）</strong>
                          </p>
                          <p>組合員は、総会で定める組合費を納入しなければならない。</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-bold text-lg mb-2">附則</h3>
                        <div className="space-y-2 text-sm">
                          <p>この規約は、令和○年○月○日から施行する。</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* District Information Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                地区情報
              </CardTitle>
              <CardDescription>△△地区の基本情報</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>人口：</strong>約○○人
                </p>
                <p>
                  <strong>世帯数：</strong>約○○世帯
                </p>
                <p>
                  <strong>主要産業：</strong>稲作、野菜栽培
                </p>
                <p>
                  <strong>特産品：</strong>○○米、△△野菜
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-600" />
                お問い合わせ
              </CardTitle>
              <CardDescription>地区や農業組合に関するお問い合わせ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>0857-XX-XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>info@example.com</span>
                </div>
                <p className="text-gray-600">受付時間：平日 9:00-17:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Agriculture Map */}
        <section className="mb-12">
          <GameAgricultureMap />
        </section>

        {/* News Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">お知らせ</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">令和6年度 総会開催のお知らせ</h3>
                  <span className="text-sm text-gray-500">2024.03.15</span>
                </div>
                <p className="text-sm text-gray-600">
                  令和6年度の農業組合総会を4月15日（月）午後7時より地区公民館にて開催いたします。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">春の農作業安全講習会</h3>
                  <span className="text-sm text-gray-500">2024.03.10</span>
                </div>
                <p className="text-sm text-gray-600">農作業事故防止のための安全講習会を3月25日（月）に開催します。</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">新規組合員募集</h3>
                  <span className="text-sm text-gray-500">2024.03.01</span>
                </div>
                <p className="text-sm text-gray-600">
                  △△農業組合では新規組合員を募集しています。詳細はお問い合わせください。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
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
