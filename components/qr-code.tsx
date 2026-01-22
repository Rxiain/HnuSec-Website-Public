import Image from "next/image"

interface QrCodeProps {
  className?: string
}

export function QrCode({ className = "" }: QrCodeProps) {
  return (
    <div className={`relative w-64 h-64 ${className}`}>
      <Image
        src="/gongzhonghaoerweima.svg"
        alt="HnuSec微信公众号二维码"
        fill
        className="object-contain"
        style={{
          backgroundColor: "transparent",
        }}
      />
    </div>
  )
} 