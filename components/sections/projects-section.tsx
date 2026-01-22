import { AsciiArt } from "@/components/ascii-art"

export function ProjectsSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="projects" />

      <div className="space-y-6">
        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">TerraGuard</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | Terraform   |---->| Static Code    |---->| Vulnerability  |
  | Config Files|     | Analysis Engine|     | Detection      |
  +-------------+     +----------------+     +----------------+
        |                    |                      |
        |                    v                      |
        |             +--------------+              |
        +------------>| AWS Security |<-------------+
                      | Best Practices|
                      +--------------+
                             |
                             v
                      +---------------+
                      | Remediation   |
                      | Report        |
                      +---------------+
`}
          </pre>
          <p className="text-sm mb-2">
            A Python tool that automatically detects 20+ security vulnerabilities in Terraform infrastructure code
            through static analysis of AWS configurations, generating detailed remediation reports.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: Python, Terraform, AWS, Static Code Analysis
          </p>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">ToadBud Chrome Extension</h3>
          <pre className="text-xs my-2 text-muted-foreground">
            {`
  +-------------+     +----------------+     +----------------+
  | Chrome      |---->| VirusTotal     |---->| Threat         |
  | Extension   |     | API            |     | Assessment     |
  +-------------+     +----------------+     +----------------+
        |                                            |
        v                                            v
  +-------------+                            +----------------+
  | URL/IP/Hash |                            | Security       |
  | Detection   |                            | Report         |
  +-------------+                            +----------------+
`}
          </pre>
          <p className="text-sm mb-2">
            A Chrome extension utilizing VirusTotal API to analyze URLs, IP addresses, and file hashes for security
            threats, providing real-time threat assessments with JavaScript and Tailwind CSS.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Technologies: JavaScript, Chrome Extensions API, VirusTotal API, Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}
