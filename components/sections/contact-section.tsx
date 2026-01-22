import { AsciiArt } from "@/components/ascii-art"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { QrCode } from "@/components/qr-code"

export function ContactSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="contact" />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-3">
            <a
              href="mailto:HnuSec@yeah.net"
              className="flex items-center text-sm hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4 mr-2 text-primary" />
              HnuSec@yeah.net
            </a>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              Haikou, HaiNan, China
            </div>
            <a
              href="https://github.com/hnusec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4 mr-2 text-primary" />
              https://github.com/hnusec
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <QrCode />
            <p className="text-xs text-muted-foreground">扫码关注公众号</p>
          </div>
        </div>
      </div>
    </div>
  )
}
