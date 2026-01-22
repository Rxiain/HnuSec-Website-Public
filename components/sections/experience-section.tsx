import { AsciiArt } from "@/components/ascii-art"

export function ExperienceSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="experience" />

      <div className="space-y-6">
        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">Cyber Range Student Assistant</h3>
            <p className="text-xs text-muted-foreground">
              Pace University, Pleasantville, NY | February 2024 - Present
            </p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>
              Design and implement UX/UI elements and cybersecurity infrastructure for Con Edison Critical
              Infrastructure Training Series
            </li>
            <li>Configure virtual environments and security tools for hands-on cybersecurity training scenarios</li>
            <li>Lead demonstrations and technical setup for training sessions in PLV Pace Cyber Range</li>
          </ul>
        </div>

        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">Security Engineer Intern</h3>
            <p className="text-xs text-muted-foreground">Cantonica, Inc., New York, NY | June 2024 - September 2024</p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>Conducted vulnerability & open port scans, prioritizing risks using MITRE ATT&CK framework</li>
            <li>
              Reduced vulnerabilities by 40% while enhancing threat detection through improved SIEM monitoring &
              incident response
            </li>
            <li>
              Authored blogs on Progressive Web Application security, boosting Cantonica's visibility & engagement
            </li>
          </ul>
        </div>

        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">SOC Analyst (Security Operations Center)</h3>
            <p className="text-xs text-muted-foreground">
              LTIMindtree Ltd., Chennai, India | November 2022 - August 2023
            </p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>
              Investigated 1,000 positive malware files & audited 200 critical IT alerts, reducing incident response
              times by 25%
            </li>
            <li>Developed & standardized 100+ security documents, detections using YAML and JSON</li>
            <li>
              Coordinated high-severity escalations involving malware like ransomware cases, resolving issues &
              mitigating future threats
            </li>
          </ul>
        </div>

        <div className="relative pl-5 border-l border-primary/30">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1" />
          <div className="mb-1">
            <h3 className="text-primary font-bold">Microsoft Threat Expert</h3>
            <p className="text-xs text-muted-foreground">Mindtree Ltd., Chennai, India | April 2021 - November 2022</p>
          </div>
          <ul className="text-sm space-y-1 list-disc pl-4">
            <li>
              Conducted 1,000+ threat hunts, performing threat analysis, incident triaging, and IOCs filing &
              documentation
            </li>
            <li>Deployed EDR solutions, reducing threat resolution times by 30% & strengthening defense mechanisms</li>
            <li>Led 100+ security awareness and security research KT sessions across departments</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
