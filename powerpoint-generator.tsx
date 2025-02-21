import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, ExternalLink } from "lucide-react"
import pptxgen from "pptxgenjs"
import { themes } from "./themes"

interface Slide {
  title: string
  content: string[]
  comments: string[]
}

interface SlidesData {
  slides: Slide[]
}

export default function PowerPointGenerator({
  data,
  updateData,
  selectedTheme,
  setSelectedTheme,
}: {
  data: SlidesData
  updateData: (newData: SlidesData) => void
  selectedTheme: string
  setSelectedTheme: (theme: string) => void
}) {
  const downloadPowerPoint = () => {
    const pres = new pptxgen()

    data.slides.forEach((slide) => {
      const pptSlide = pres.addSlide()

      // Add title
      pptSlide.addText(slide.title || "Untitled Slide", {
        x: 0.5,
        y: 0.5,
        w: "90%",
        fontSize: 24,
        bold: true,
      })

      // Add content as bullet points
      slide.content.forEach((item, index) => {
        pptSlide.addText(item || `Point ${index + 1}`, {
          x: 0.5,
          y: 1.5 + index * 0.5,
          w: "90%",
          fontSize: 18,
          bullet: true,
        })
      })

      // Add comments as speaker notes
      if (slide.comments && slide.comments.length > 0) {
        pptSlide.addNotes(slide.comments.join("\n\n"))
      }
    })

    // Save the presentation
    pres.writeFile({ fileName: "presentation.pptx" })
  }

  const goLive = () => {
    const liveUrl = `/live?data=${encodeURIComponent(JSON.stringify(data))}&theme=${selectedTheme}`
    const newWindow = window.open(liveUrl, "_blank")
    newWindow?.addEventListener("load", () => {
      newWindow.document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`)
      })
    })
  }

  const openComments = () => {
    const commentsUrl = `/live/comments?data=${encodeURIComponent(JSON.stringify(data))}&theme=${selectedTheme}&slide=0`
    window.open(commentsUrl, "CommentsWindow", "width=400,height=600")
  }

  const theme = themes.find((t) => t.name === selectedTheme) || themes[0]

  return (
    <div className={`container mx-auto p-4 space-y-8 ${theme.background} ${theme.text}`}>
      <div className="flex justify-between mb-4">
        <Button onClick={downloadPowerPoint}>
          <Download className="mr-2 h-4 w-4" /> Download PowerPoint
        </Button>
        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.name} value={theme.name}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            goLive()
            openComments()
          }}
        >
          <ExternalLink className="mr-2 h-4 w-4" /> GO LIVE
        </Button>
      </div>
      {data.slides.map((slide, index) => (
        <Card
          key={index}
          className={`w-full max-w-3xl mx-auto ${theme.background} ${theme.text} border-${theme.primary}`}
        >
          <CardHeader className={theme.primary}>
            <CardTitle className="text-2xl font-bold text-center text-white">
              {slide.title || `Slide ${index + 1}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {slide.content.map((item, itemIndex) => (
                <li key={itemIndex} className="text-lg">
                  {item || `Content item ${itemIndex + 1}`}
                </li>
              ))}
            </ul>
          </CardContent>
          {slide.comments && slide.comments.length > 0 && (
            <CardFooter className={`flex flex-col items-start ${theme.secondary}`}>
              <h3 className="text-lg font-semibold mb-2">Comments:</h3>
              <ul className="list-disc list-inside space-y-1">
                {slide.comments.map((comment, commentIndex) => (
                  <li key={commentIndex} className="text-sm">
                    {comment || `Comment ${commentIndex + 1}`}
                  </li>
                ))}
              </ul>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}

