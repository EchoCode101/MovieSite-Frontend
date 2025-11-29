import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

export function ImageWithFallback({
  className,
  src,
  alt,
  fallbackSrc = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Abstract dark background as default
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [errored, setErrored] = useState(false)

  return (
    <img
      className={cn("transition-opacity duration-300", className, {
        "opacity-0": !imgSrc && !errored,
        "opacity-100": imgSrc || errored,
      })}
      src={errored ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        setErrored(true)
        setImgSrc(fallbackSrc)
      }}
      {...props}
    />
  )
}
