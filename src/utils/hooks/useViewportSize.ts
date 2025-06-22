// hooks/useViewportSize.ts
import { useState, useEffect } from "react"

export const useViewportSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => { window.removeEventListener("resize", handleResize); }
  }, [])

  // Функция для вычисления % от ширины
  const getWidthPercent = (percent: number) => size.width * (percent / 100)

  // Функция для вычисления % от высоты
  const getHeightPercent = (percent: number) => size.height * (percent / 100)

  return {
    width: size.width,
    height: size.height,
    getWidthPercent,
    getHeightPercent,
  }
}
