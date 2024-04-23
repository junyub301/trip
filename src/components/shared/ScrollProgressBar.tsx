import { SerializedStyles } from '@emotion/react'
import { colors, Colors } from '@styles/colorPalette'
import { useEffect, useRef, useState } from 'react'

export default function ScrollProgressBar({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) {
  const [progress, setProgress] = useState<number>(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProgress(scrollTop / height)
      })
    }
    window.addEventListener('scroll', scroll)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      css={style}
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
        backgroundColor: colors[color],
        height: 8,
      }}
    ></div>
  )
}
