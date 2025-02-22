"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { themes } from "../../themes"
import Image from "next/image"
import Link from "next/link"


export default function LivePresentation() {
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [data, setData] = useState({ slides: [] })
  const [theme, setTheme] = useState(themes[0])
  const [channel, setChannel] = useState<BroadcastChannel | null>(null)

  useEffect(() => {
    const dataParam = searchParams.get("data")
    const themeParam = searchParams.get("theme")
    if (dataParam) {
      setData(JSON.parse(decodeURIComponent(dataParam)))
    }
    if (themeParam) {
      setTheme(themes.find((t) => t.name === themeParam) || themes[0])
    }

    const newChannel = new BroadcastChannel("live-presentation")
    setChannel(newChannel)

    newChannel.onmessage = (event) => {
      if (event.data.type === "CHANGE_SLIDE") {
        setCurrentSlide(event.data.slideIndex)
      }
    }

    return () => {
      newChannel.close()
    }
  }, [searchParams])

  const nextSlide = useCallback(() => {
    if (currentSlide < data.slides.length - 1) {
      const newSlideIndex = currentSlide + 1
      setCurrentSlide(newSlideIndex)
      channel?.postMessage({ type: "CHANGE_SLIDE", slideIndex: newSlideIndex })
    }
  }, [channel, currentSlide, data.slides.length])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      const newSlideIndex = currentSlide - 1
      setCurrentSlide(newSlideIndex)
      channel?.postMessage({ type: "CHANGE_SLIDE", slideIndex: newSlideIndex })
    }
  }, [channel, currentSlide])

  const openComments = () => {
    const commentsUrl = `/live/comments?data=${encodeURIComponent(JSON.stringify(data))}&theme=${theme.name}&slide=${currentSlide}`
    window.open(commentsUrl, "CommentsWindow", "width=400,height=600")
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide()
      } else if (event.key === "ArrowLeft") {
        prevSlide()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [nextSlide, prevSlide])

  if (data.slides.length === 0) {
    return <div>Loading...</div>
  }

  const slide = data.slides[currentSlide]

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-8 ${theme.background} ${theme.text}`}>
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={openComments}>
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute gap-3 top-4 left-4 items-center z-10 flex">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Link about="_blank" href="https://byteforce.ma">
          <div className="h-6 w-6 relative">
            <Image alt="Byte force" src="https://byteforce.ma/wp-content/uploads/2023/08/byte-force-icon-maroc-developement-informatique.png" fill objectFit="cover" objectPosition="center" />
          </div>
        </Link>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full flex flex-col justify-center items-center"
          >
            <h1 className={`text-4xl font-bold mb-8 ${theme.primary} text-white p-4 rounded`}>{slide.title}</h1>
            <ul className="list-disc list-inside space-y-6 text-2xl max-w-4xl">
              {slide.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-0 right-0 flex justify-between px-8">
        <Button onClick={prevSlide} disabled={currentSlide === 0} size="lg">
          <ChevronLeft className="mr-2 h-6 w-6" />
        </Button>
        <Button onClick={nextSlide} disabled={currentSlide === data.slides.length - 1} size="lg">
          <ChevronRight className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
