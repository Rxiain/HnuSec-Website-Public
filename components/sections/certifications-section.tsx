import { AsciiArt } from "@/components/ascii-art"
import { Award, Trophy, Flag } from "lucide-react"

export function CertificationsSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="certifications" />

      <div className="space-y-6">
        <div>
          <h3 className="text-primary font-bold mb-2 flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Certifications
          </h3>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <p className="font-medium">Microsoft Certified Security Operations Associate (SC-200)</p>
                <p className="text-xs text-muted-foreground">Microsoft</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <p className="font-medium">CISSP (In-progress)</p>
                <p className="text-xs text-muted-foreground">(ISC)²</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2 flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            Competitions
          </h3>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>National Cyber League</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>NSA Codebreaker</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Tech Duels Debate (Data Privacy vs. National Security)</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>TryHackMe Player (CTF)</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2 flex items-center">
            <Flag className="h-4 w-4 mr-2" />
            Cybersecurity Initiatives
          </h3>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>Cyber Risk Assessment & Insurance Product – American Technology Services (ATS)</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p>ISACA Student Volunteer</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
