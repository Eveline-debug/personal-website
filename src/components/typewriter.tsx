"use client"

import { useEffect, useState } from "react"

type TypewriterProps = {
  words: string[]
  speed?: number
  pause?: number
}

export function Typewriter({ words, speed = 90, pause = 1400 }: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (words.length === 0) {
      return
    }

    if (!isDeleting && subIndex === words[index].length) {
      const timeout = setTimeout(() => setIsDeleting(true), pause)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [index, subIndex, isDeleting, words, speed, pause])

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-primary">{words[index]?.substring(0, subIndex)}</span>
      <span className="h-5 w-[2px] animate-pulse bg-primary" />
    </span>
  )
}
