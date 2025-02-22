"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { themes } from "../../../themes"

export default function CommentsPopup() {
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [data, setData] = useState({ slides: [] })
  const [theme, setTheme] = useState(themes[0])
  const [channel, setChannel] = useState<BroadcastChannel | null>(null)

  useEffect(() => {
    const dataParam = searchParams.get("data")
    const themeParam = searchParams.get("theme")
    const slideParam = searchParams.get("slide")
    if (dataParam) {
      setData(JSON.parse(decodeURIComponent(dataParam)))
    }
    if (themeParam) {
      setTheme(themes.find((t) => t.name === themeParam) || themes[0])
    }
    if (slideParam) {
      setCurrentSlide(Number.parseInt(slideParam, 10))
    }

    const newChannel = new BroadcastChannel("live-presentation")
    setChannel(newChannel)

    // Listen for slide changes from the main page
    newChannel.onmessage = (event) => {
      if (event.data.type === "CHANGE_SLIDE") {
        setCurrentSlide(event.data.slideIndex)
      }
    }

    return () => {
      newChannel.close()
    }
  }, [searchParams])

  const nextSlide = () => {
    if (currentSlide < data.slides.length - 1) {
      const newSlideIndex = currentSlide + 1
      setCurrentSlide(newSlideIndex)
      channel?.postMessage({ type: "CHANGE_SLIDE", slideIndex: newSlideIndex })
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      const newSlideIndex = currentSlide - 1
      setCurrentSlide(newSlideIndex)
      channel?.postMessage({ type: "CHANGE_SLIDE", slideIndex: newSlideIndex })
    }
  }

  if (data.slides.length === 0) {
    return <div>Loading...</div>
  }

  const slide = data.slides[currentSlide]

  return (
    <div className={`min-h-screen flex flex-col p-4 ${theme.background} ${theme.text}`}>
      <h2 className={`text-xl font-bold mb-4 ${theme.primary} p-2 rounded`}>Comments for Slide {currentSlide + 1}</h2>
      {slide.comments && slide.comments.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 mb-4">
          {slide.comments.map((comment, index) => (
            <li key={index} className="text-lg">
              {comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments for this slide.</p>
      )}
      <div className="mt-auto flex justify-between">
        <Button onClick={prevSlide} disabled={currentSlide === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextSlide} disabled={currentSlide === data.slides.length - 1}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
